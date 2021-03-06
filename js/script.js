'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags',
  optAuthorsListSelector = '.authors',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optTagsLinkSelector = 'a[href^="#tag-"]',
  optAuthorsLinkSelector = 'a[href^="#author-"]';

/* ####################### TITLES/ARTICLES ####################### */

const titleClickHandler = function(event) {
  event.preventDefault(); // #rethink why it has to be here#
  
  const activeLinks = document.querySelectorAll('.titles a.active'); // remove class 'active' from all article links

  for(let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  const clickedElement = this; // #return here#
  
  clickedElement.classList.add('active'); // add class 'active' to the clicked link

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles) { // remove class 'active' from all articles
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href'); // get 'href' attribute from the clicked link

  const targetArticle = document.querySelector(articleSelector); // find the correct article using the selector (value of 'href' attribute)

  targetArticle.classList.add('active'); // add class 'active' to the correct article
};

const generateTitleLinks = function(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector); // finding .titles 
  
  titleList.innerHTML = ''; // and changing their content to blank

  const articles = document.querySelectorAll(optArticleSelector + customSelector); // for each article

  let titleHtml = ''; // #rethink why not inside the loop and why empty#

  for(let article of articles) {
    const articleId = article.getAttribute('id'); // get the article id

    const articleTitle = article.querySelector(optTitleSelector).innerHTML; // find the title element and get the title from the title element

    const titleLinkHTMLData = {id: articleId, title: articleTitle}; // Handlebars data source (look at index.html)
    const titleLinkHTML = templates.articleLink(titleLinkHTMLData); // Handlebars generated html link
    
    titleHtml = titleHtml + titleLinkHTML; // generate html of link
  }

  titleList.innerHTML = titleHtml; // insert link into titleList
  
  const links = document.querySelectorAll('.titles a'); // #rethink why does it work now - only inside function#

  for(let link of links) {
    link.addEventListener('click', titleClickHandler); 
  }
};

generateTitleLinks();

/* ####################### TAGS ####################### */

const calculateTagsParams = function(tags) { // #rethink why it works#
  const params = {max: 0, min: 999999}; // #why max 0#
  
  for(let tag in tags) { // for ... in for operation on every element in object #where does tag lead#
    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if(tags[tag] < params.min) {
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
  
  return optCloudClassPrefix + classNumber; // return tag-size- with generated integer
};

const generateTags = function() {
  let allTags = {}; // create a new variable allTags with an empty object

  const articles = document.querySelectorAll(optArticleSelector); // find all articles
  
  for(let article of articles) { // START LOOP: for every article:
    const articleTagsWrapper = article.querySelector(optArticleTagsSelector);  // find tags wrapper

    let tagHtml = ''; // make html variable with empty string

    const articleTags = article.getAttribute('data-tags'); // get tags from data-tags attribute

    const articleTagsArray = articleTags.split(' '); // split tags into array

    for(let tag of articleTagsArray) { // START LOOP: for each tag
      const tagLinkHTMLData = {id: tag, title: tag}; // Handlebars data (look at index.html)
      const tagLinkHTML = templates.tagLink(tagLinkHTMLData); // Handlebars generated html link
      
      tagHtml = tagHtml + tagLinkHTML; // add generated code to html variable

      if(!allTags[tag]) { // check if this link is NOT already in allTags
        allTags[tag] = 1; // add tag to allTags object
      } else {
        allTags[tag]++; // if there is increase in loop
      }
    } // END LOOP: for each tag

    articleTagsWrapper.innerHTML = tagHtml;  // insert HTML of all the links into the tags wrapper
  }  // END LOOP: for every article

  const tagList = document.querySelector(optTagsListSelector); // find list of tags in right column

  const tagsParams = calculateTagsParams(allTags); // calculated max and min for all tags

  const allTagsData = {tags: []}; // create object with array

  for(let tag in allTags) { // START LOOP: for each tag in allTags:
    allTagsData.tags.push({ // push object with keys
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  } // END LOOP: for each tag in allTags

  tagList.innerHTML = templates.tagCloudLink(allTagsData); // add HTML generated from allTagsData to tagList
};

generateTags();

const tagClickHandler = function(event) {
  event.preventDefault();   // prevent default action for this event

  const clickedElement = event.target; // make new constant named "clickedElement" and give it the value of event.target

  const href = clickedElement.getAttribute('href'); // make a new constant "href" and read the attribute "href" of the clicked element

  const tag = href.replace('#tag-', ''); // make a new constant "tag" and extract tag from the "href" constant

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]'); // find all tag links with class active

  for(let activeTagLink of activeTagLinks) { // START LOOP: for each active tag link
    activeTagLink.classList.remove('active');   // remove class active
  } // END LOOP: for each active tag link

  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]'); // find all tag links with "href" attribute equal to the "href" constant

  for(let hrefTagLink of hrefTagLinks) {  // START LOOP: for each found tag link
    hrefTagLink.classList.add('active'); // add class active
  } //END LOOP: for each found tag link

  generateTitleLinks('[data-tags~="' + tag + '"]');   // execute function "generateTitleLinks" with article selector as argument
};

const addClickListenersToTags = function() {
  const links = document.querySelectorAll(optTagsLinkSelector);   // find all links to tags with a selector argument

  for(let link of links) { // START LOOP: for each link
    link.addEventListener('click', tagClickHandler); // add tagClickHandler as event listener for that link
  } // END LOOP: for each link
};

addClickListenersToTags();


/* ####################### AUTHORS ####################### */

const generateAuthors = function() {
  let allAuthors = {}; // create a new variable allAuthors with an empty object

  const articles = document.querySelectorAll(optArticleSelector); // find all .post in html
  
  for(let article of articles) { // START LOOP: for every .post of all .post
    const articleAuthorWrapper = article.querySelector(optArticleAuthorSelector); // find .post-author in article element

    const author = article.getAttribute('data-author'); // get data-author tag from .post (in this case article element)

    const noDashAuthorName = author.replace('-', ' ');
    
    const authorHTMLData = {id: author, title: noDashAuthorName}; // Handlebars data (look at index.html)
    const authorHTML = templates.authorLink(authorHTMLData); // Handlebars generated html link

    if(!allAuthors[author]) { // check if this link is NOT already in allAuthors
      allAuthors[author] = 1; // if there is not set 1
    } else {
      allAuthors[author]++; // if there is increase number in loop by 1
    }

    articleAuthorWrapper.innerHTML = authorHTML; // insert data-author tag to .post-author html element
  } // END LOOP
  
  const authorList = document.querySelector(optAuthorsListSelector); // find list of authors in right column

  const allAuthorsData = {authors: []}; // create object with an array

  for(let author in allAuthors) { // START LOOP: for each author in allAuthors object:
    allAuthorsData.authors.push({ // push object with keys
      author: author,
      count: allAuthors[author],
      noDashAuthorName: author.replace('-', ' ')
    });
  } // END LOOP: for each tag in allTags

  authorList.innerHTML = templates.authorListLink(allAuthorsData); // add HTML from allAuthorsHTML to authorList
};

generateAuthors();

const authorClickHandler = function(event){
  event.preventDefault(); // prevent default action for event (propagation)
  
  const clickedElement = event.target;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]'); // #

  for(let activeAuthorLink of activeAuthorLinks){
    activeAuthorLink.classList.remove('active'); // #
  }

  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]'); // #

  for(let hrefAuthorLink of hrefAuthorLinks){
    hrefAuthorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]'); // #
};

const addClickListenersToAuthors = function(){
  const links = document.querySelectorAll(optAuthorsLinkSelector); // links to all authors in HTML with a selector

  for(let link of links){ // for each link of every link to authors
    link.addEventListener('click', authorClickHandler);
  }
};

addClickListenersToAuthors();