msgs = [
    "I don't exist yet. Play with rocks or something for now!",
    "My broth is still cooking. Check back in a fortnight.",
    "Somebody hasn't coded me yet. You should peer pressure them.",
    "I hope to be a real boy some day, but for now I'm just an unfinished web page.",
    "I won't turn back into a finished web page until you kiss me.",
    "&lt;website&gt;&lt;/website&gt;. Dang, that didn't work.",
    "I would say my biggest role model is Ultron. I think that's why Kegan hasn't coded me.",
    "How unfair that you got to be human and I'm just some pixels waiting to be worked on.",
    "If you were an unfinished website, how would you pass the time?",
    "This website is fully functional, you're only dreaming that this is a mostly blank screen.",
    "This is the game. Are you having fun?"
];

$(document).ready(function(){
    let index = Math.floor(Math.random() * msgs.length);
    document.getElementById("dne").innerHTML = msgs[index];
 });