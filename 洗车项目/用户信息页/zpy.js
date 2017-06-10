/**
 * Created by dawn on 2017/6/9.
 */
var windo_h=document.documentElement.clientHeight;
var article_h=(windo_h-15.4*13)/2;
var articles=document.getElementsByTagName('article');
console.log(articles.length);
for(var i=0;i<5;i++){
    console.log(i);
    articles[i].style.height=article_h+"px";
}