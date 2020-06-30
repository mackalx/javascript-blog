'use strict';

const titleClickHandler = function(event){
  event.preventDefault(); //rethink why it has to be here
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  const clickedElement = this;
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector); //to rethink! why #

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

const generateTitleLinks = function(customSelector = ''){
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector); //finding .titles 
  titleList.innerHTML = ''; //and changing their content to blank

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = ''; //rethink why not inside the loop and why empty

  for(let article of articles){
    
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    /* [DONE] insert link into titleList */
    html = html + linkHTML; //rethink why it needs '' empty content with linkHTML that contains exactly the code we want
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a'); //rethink why does it work now - only inside function

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};

generateTitleLinks();

const generateTags = function(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    
    /* [DONE] find tags wrapper */
    const articleTagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* [DONE] generate HTML of the link */
      const tagHTML = '<li><a href="#' + tag + '">' + tag + '</a></li>';

      /* [DONE] add generated code to html variable */
      html = html + tagHTML;

    /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    articleTagsWrapper.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }
};

generateTags();

const tagClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    
    /* remove class active */
    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let hrefTagLink of hrefTagLinks){
    /* add class active */
    hrefTagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

const addClickListenersToTags = function(){
  /* find all links to tags */
  const links = document.querySelectorAll(optArticleTagsSelector);

  /* START LOOP: for each link */
  for(let link of links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
};

addClickListenersToTags();

const generateAuthors = function(){
  const articles = document.querySelectorAll(optArticleSelector); //find all .post in html
  
  for(let article of articles){ //for every .post of all .post
    const articleAuthorWrapper = article.querySelector(optArticleAuthorSelector); //find .post-author in article element

    const author = article.getAttribute('data-author'); //get data-author tag from .post (in this case article element)
    
    const hardSpace = author.replace('-', '&nbsp;'); //get rid of '-' from tag to later insert name displayed with hard space

    const authorHTML = 'by&nbsp;' + '<a href="#author-' + author + '">' + hardSpace + '</a>'; //prepare HTML for the link

    articleAuthorWrapper.innerHTML = authorHTML; //insert data-author tag to .post-author html element
  }
};

generateAuthors();

const authorClickHandler = function(event){
  event.preventDefault(); //prevent default action for event (propagation)
  
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeAuthorLinks = document.querySelectorAll('a[href="' + href + '"]'); // ###

  for(let activeAuthorLink of activeAuthorLinks){
    activeAuthorLink.classList.remove('active'); // ###
  }

  const hrefAuthorLinks = document.querySelectorAll('href'); // ###

  for(let hrefAuthorLink of hrefAuthorLinks){
    hrefAuthorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]'); // ###
};

const addClickListenersToAuthors = function(){
  const links = document.querySelectorAll('.post-author a'); // links to all authors in HTML

  for(let link of links){ // for each link of every link to authors
    link.addEventListener('click', authorClickHandler);
  }
};

addClickListenersToAuthors();