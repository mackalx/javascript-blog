'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//   const links = document.querySelectorAll('.titles a');
//   console.log('links:', links);
// });

const titleClickHandler = function(event){
  event.preventDefault();
  console.log('Link was clicked!', event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    console.log('link .active removed', activeLink);
  }

  /* [DONE] add class 'active' to the clicked link */
  
  const clickedElement = this;
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  console.log('clicked link .active added', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    console.log('article .active removed', activeArticle)
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('article selected', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector); //to rethink! why #
  console.log('article found', targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('article .active added', targetArticle);
}

const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';

const generateTitleLinks = function(){
 
  /* [DONE] remove contents of titleList */
  
  const titleList = document.querySelector(optTitleListSelector); //finding .titles 
  titleList.innerHTML = ''; //and changing their content to blank

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector);

  let html = ''; //rethink why not inside the loop 

  for(let article of articles){
    
    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    console.log('article id', articleId);

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('found title', articleTitle);

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('link code', linkHTML);
    
    /* [DONE] insert link into titleList */
    
    html = html + linkHTML;

    console.log('content is', html);
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a'); //rethink why does it work now - only inside function
  console.log('contents of const links', links);

  for(let link of links){
  link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();