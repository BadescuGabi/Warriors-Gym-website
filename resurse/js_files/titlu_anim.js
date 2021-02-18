
// function show()
// {
//     document.getElementById('bg-text').style.visibility="visible";
//     var a=document.getElementById('bg-text').innerHTML;
//   console.log( typeof a);
//   var i=0;
//   var n=a.length;
//   for(let j=0;j<a.length;j++)
//  { 
// }}
// for(let j=0;j<5 ; j++){
// setTimeout("show()",100);} 
//2.13
window.onload=function cnt(){
    var count=0;
    var paragraphs = document.getElementsByTagName("body");
    console.log(paragraphs[0].innerText.split(" ").length);
        count += paragraphs[0].innerText.split(" ").length;
        //console.log( paragraphs[i].innerText.split(/[^\bA-Za-z0-9]/));
    

 document.getElementsByTagName("footer")[0].innerHTML+="Numarul de cuvinte este " + count;
}
//NUMARA CUVINTE PAGINA IN FOOTER


