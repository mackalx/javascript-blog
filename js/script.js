'use strict';

const titleClickHandler = function(event){
  event.preventDefault(); //rethink why it has to be here
  
  const activeLinks = document.querySelectorAll('.titles a.active'); // remove class 'active' from all article links

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  
  const clickedElement = this; // return here
  clickedElement.classList.add('active'); // add class 'active' to the clicked link

  
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){ // remove class 'active' from all articles
    activeArticle.classList.remove('active');
  }

  
  const articleSelector = clickedElement.getAttribute('href'); // get 'href' attribute from the clicked link

  
  const targetArticle = document.querySelector(articleSelector); //find the correct article using the selector (value of 'href' attribute)

  
  targetArticle.classList.add('active'); // add class 'active' to the correct article
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';

const generateTitleLinks = function(customSelector = ''){
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector); //finding .titles 
  titleList.innerHTML = ''; //and changing their content to blank

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let titleHtml = ''; //rethink why not inside the loop and why empty

  for(let article of articles){
    
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    const titleLinkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    /* [DONE] insert link into titleList */
    titleHtml = titleHtml + titleLinkHTML; //rethink why it needs '' empty content with linkHTML that contains exactly the code we want
  }

  titleList.innerHTML = titleHtml;
  const links = document.querySelectorAll('.titles a'); // rethink why does it work now - only inside function

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};

generateTitleLinks();

const calculateTagsParams = function(tags) { // rethink why it works
  const params = {max: 0, min: 999999}; // why max 0
  for(let tag in tags){ // for ... in for operation on every element in object; where does tag lead
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params; // returns max and min count of all tags
};

const calculateTagClass = function(count, params) {
  const normalizedCount = count - params.min; // how far is the current tag count from min tag occurence
  const normalizedMax = params.max - params.min; // how far is the maximum from min tag occurence
  const percentage = normalizedCount / normalizedMax; // gives a number corresponding to a percentage between the above
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1); // generating integer of the required tag-size- class (with degrading the const to maintain the 5 class range)
  return optCloudClassPrefix + classNumber;
};

const generateTags = function(){
  /* [NEW] create a new variable allTags with an empty array (in this case changed to object) */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    
    /* [DONE] find tags wrapper */
    const articleTagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let tagHtml = '';

    /* [DONE] get tags from data-tags attribute */ 
    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* [DONE] generate HTML of the link */
      const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> '; // tags HTML in the .posts .list-horizontal ul

      /* [DONE] add generated code to html variable */
      tagHtml = tagHtml + tagLinkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    articleTagsWrapper.innerHTML = tagHtml;

  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    const allTagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a> (' + allTags[tag] + ') </li>'; // tags HTML in the sidebar .list .tags ul
    console.log('tagLinkHTML:', allTagLinkHTML);
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += allTagLinkHTML;
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
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
    
    const dashToHardSpace = author.replace('-', '&nbsp;'); //get rid of '-' from tag to later insert name displayed with hard space

    const authorHTML = 'by&nbsp;' + '<a href="#author-' + author + '">' + dashToHardSpace + '</a>'; //prepare HTML for the link

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