console.log("console is connected");
    function loadLessons (){
        console.log("lessons are loading")
        fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data) => displayLessons(data.data))
    }

    function loadVideoByButton (level){
        console.log(level);
        const url = `https://openapi.programming-hero.com/api/level/${level}`
        fetch (url)
        .then((res) => res.json())
        .then((data) => displayLessonCards(data.data))
    }


    function displayLessons(datas) {
        
        const lesson_container = document.getElementById("lesson-container");
        for(let data of datas ){
            
            const lessondiv = document.createElement("div");
            lessondiv.innerHTML = `
            <button onclick ="loadVideoByButton(${data.level_no})"  class="btn btn-outline btn-primary"><img src="assets/fa-book-open.png" alt="">Lesson-${data.level_no}</button>
            `
            lesson_container.append(lessondiv);
        }
    }
    loadLessons();

    function loadLessonCardData (){
        console.log("card data is loading")
        fetch("https://openapi.programming-hero.com/api/level/5")
        .then((res) => res.json())
        .then((data) => displayLessonCards(data.data))
    }
    function displayLessonCards (datas){
        
        const lesson_Card = document.getElementById("lesson_card_container");
        lesson_Card.innerHTML = "";
        if(datas.length == 0){
            lesson_Card.innerHTML = `
            
            <div class="flex flex-col justify-center items-center col-span-3 mt-20 shadow-xl py-40">
                    <img src="assets/alert-error.png" alt="" class = "mb-3">
                    <p class="font-bold text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h2 class="text-5xl mt-5">নেক্সট Lesson এ যান</h2>
                </div>
            `;
        }
        for(let data of datas){
            
            const lessonCardDiv = document.createElement("div");
            lessonCardDiv.innerHTML = `
            <div class="card w-96 bg-base-100 card-xl shadow-sm p-5">
                    <div class="card-body text-center">
                        <h2 class=" text-center font-bold text-2xl">${data.word}</h2>
                        <p class="text-gray-400">Meaning /Pronounciation</p>
                        <p class="font-bold text-xl">"${data.meaning}/ ${data.pronunciation}"</p>
                    </div>
                    <div class="flex justify-between">
                        <button class="btn btn-lg" onclick="loadCardDetails(${data.id})"><i class="fa-solid fa-circle-exclamation"></i></button>
                        <button class="btn btn-lg">
                            <i class="fa-solid fa-volume-high"></i></button>
                    </div>
            </div>
            `
            lesson_Card.append(lessonCardDiv);

        }
    }

    function loadCardDetails (id){
        
        fetch(`https://openapi.programming-hero.com/api/word/${id}`)
        .then((res) => res.json())
        .then((data) => displayCardDetails(data.data))
    }
    function displayCardDetails (data) {
        console.log(data)
        document.getElementById("card_details").showModal();
        const details_container = document.getElementById("details_container");
        details_container.innerHTML = `
        

        <h3 class="text-3xl font-bold mb-6">${data.word}</h3>
        <p class="text-xl font-bold mb-4" >Meaning</p>
        <p class="font-bold text-md ">${data.meaning}</p>
        <h4 class="font-bold text-lg mt-5">Example</h4>
        <p class="mb-6 text-gray-500">${data.sentence}</p>
        <p class="font-bold text-3xl">সমার্থক শব্দ গুলো</p>
        <div class="flex gap-5 mt-5">
        <h3 class="bg-[#EDF7FF] p-4 rounded-lg text-xl">${data.synonyms[0]}</h3>
        <h3 class="bg-[#EDF7FF] p-4 rounded-lg text-xl">${data.synonyms[1]}</h3>
        <h3 class="bg-[#EDF7FF] p-4 rounded-lg text-xl">${data.synonyms[2]}</h3>
    </div>
        `
    }
    





    