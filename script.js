// Typing animation
const text=["Aspiring Software Engineer","Full Stack Developer","Cloud Enthusiast"];
let count=0,index=0,currentText='',letter='';
(function type(){
if(count===text.length){count=0;}
currentText=text[count];
letter=currentText.slice(0,++index);
document.getElementById('typing').textContent=letter;
if(letter.length===currentText.length){count++;index=0;setTimeout(type,1500);}
else{setTimeout(type,80);}
})();

// Smooth scroll + active nav
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
anchor.addEventListener('click',function(e){
e.preventDefault();
document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
});
});

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".side-link");

window.addEventListener("scroll",()=>{
let current="";
sections.forEach(section=>{
const sectionTop=section.offsetTop;
if(scrollY>=sectionTop-300){current=section.getAttribute("id");}
});
navLinks.forEach(link=>{
link.classList.remove("active");
if(link.getAttribute("href").includes(current)){link.classList.add("active");}
});
});