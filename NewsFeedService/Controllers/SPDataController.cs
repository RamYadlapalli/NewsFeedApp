using Microsoft.SharePoint.Client;
using Microsoft.SharePoint.Client.Social;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security;
using System.Web.Http;

namespace NewsFeedService.Controllers
{
    public class Creds
    {
        public string UName { get; set; }
        public string Passwd { get; set; }
    }

    public class PostItem
    {
        public string ThreadId { get; set; }
        public string PostId { get; set; }
        public string Message { get; set; }
        public int Author { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime ModifiedTime { get; set; }
        public bool IncludeCurrentUserLike { get; set; }
        public int LikeCount { get; set; }
        public List<int> LikerIndexes { get; set; }
        public List<PostItem> Replies { get; set; }
    }

    public class SPDataController : ApiController
    {
        private ClientContext Authenticate(string siteUrl, Creds credentials)
        {
            string SpoSiteUrl = "https://newsfeed.sharepoint.com";
            siteUrl = String.IsNullOrWhiteSpace(siteUrl) ? SpoSiteUrl : siteUrl;
            ClientContext clientContext = new ClientContext(siteUrl);
            SecureString passWord = new SecureString();
            foreach (char c in credentials.Passwd.ToCharArray()) passWord.AppendChar(c);
            clientContext.Credentials = new SharePointOnlineCredentials(credentials.UName, passWord);
            return clientContext;
        }

        private PostItem GetPost(SocialThread thread)
        {
            if (null != thread.RootPost)
            {
                return new PostItem()
                {
                    ThreadId = thread.Id,
                    PostId = thread.RootPost.Id,
                    Message = thread.RootPost.Text,
                    Author = thread.RootPost.AuthorIndex,
                    CreatedTime = thread.RootPost.CreatedTime,
                    ModifiedTime = thread.RootPost.ModifiedTime,
                    IncludeCurrentUserLike = null != thread.RootPost.LikerInfo ? thread.RootPost.LikerInfo.IncludesCurrentUser : false,
                    LikeCount = null != thread.RootPost.LikerInfo ? thread.RootPost.LikerInfo.TotalCount : 0,
                    LikerIndexes = null != thread.RootPost.LikerInfo ? thread.RootPost.LikerInfo.Indexes.ToList<int>() : null,
                    Replies = GetReplies(thread)
                };
            }
            return new PostItem();
        }

        private List<PostItem> GetReplies(SocialThread thread)
        {
            List<PostItem> replies = new List<PostItem>();
            foreach (SocialPost reply in thread.Replies)
            {
                replies.Add(new PostItem()
                {
                    ThreadId = thread.Id,
                    PostId = reply.Id,
                    Message = reply.Text,
                    Author = reply.AuthorIndex,
                    CreatedTime = reply.CreatedTime,
                    ModifiedTime = reply.ModifiedTime,
                    IncludeCurrentUserLike = null != reply.LikerInfo ? reply.LikerInfo.IncludesCurrentUser : false,
                    LikeCount = null != reply.LikerInfo ? reply.LikerInfo.TotalCount : 0,
                    LikerIndexes = null != reply.LikerInfo ? reply.LikerInfo.Indexes.ToList<int>(): null
                });
            }
            return replies;
        }

        // GET api/spdata
        public IEnumerable<PostItem> Get([FromUri]Creds credentials)
        {
            string SpoSiteUrl = "https://newsfeed.sharepoint.com";
            List<PostItem> postDictionary = new List<PostItem>();
            try
            {
                using (ClientContext clientContext = Authenticate(SpoSiteUrl, credentials))
                {
                    Web web = clientContext.Web;

                    //Feed options
                    SocialFeedManager feedManager = new SocialFeedManager(clientContext);
                    SocialFeedOptions feedOptions = new SocialFeedOptions();
                    feedOptions.MaxThreadCount = 10;
                    feedOptions.SortOrder = SocialFeedSortOrder.ByModifiedTime;

                    ClientResult<SocialFeed> feed = null;
                    feed = feedManager.GetFeed(SocialFeedType.Personal, feedOptions);
                    clientContext.ExecuteQuery();

                    foreach (SocialThread thread in feed.Value.Threads)
                    {
                        PostItem postMsg = GetPost(thread);
                        postDictionary.Add(postMsg);
                    }
                }
            }
            catch (Exception exception)
            {
                /*
                 * Log in event viewer when deployed to IIS
                 * Log to Azure DB when deployed to Azure
                */
            }
            finally
            {
            }
            return postDictionary;
        }

        // GET api/spdata/5
        public string Get(int id)
        {
            return "value";
        }



        // POST api/spdata
        public void Post([FromBody]string value)
        {

        }

        // PUT api/spdata/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/spdata/5
        public void Delete(int id)
        {
        }
    }
}
