function getMovies()
{
    return new Promise((resolve, reject)=>
    {
        setTimeout(()=>
        {
            const movies = [ 
                 { id: 1, title: "InceptiOn", genre: "Sci-Fi", watched: false, releaseYear: 2010 }, 
                 { id: 2, title: "The WhAle", genre: "Drama", watched: true, releaseYear: 2022 }, 
                 { id: 3, title: "ThE Shinning", genre: "Terror", watched: false, releaseYear: 1980 }, 
                 { id: 4, title: "AmAdeUs", genre: "Drama", watched: false, releaseYear: 1984 }, 
                 { id: 5, title: "ThEre WilL Be blooD", genre: "Drama", watched: true, releaseYear: 2007 } 
                 ]

            resolve(movies);
            reject("Error cargando peliculas");

        },1500); 
    });
}


async function initApp()
{
    try{

        const movies = await getMovies();
        console.log(movies);

        const container = document.getElementById("movie-container");

        const normalizedMovies = movies.map((movie)=>
        {
            let fixedTitle = movie.title
                .toLowerCase()
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            let type = movie.releaseYear < 2000 ? "Classic" : "Modern";

            return {
                ...movie,
                title: fixedTitle,
                type: type
            };
        });

        console.log(normalizedMovies);


        normalizedMovies.forEach((movie)=>
        {
            let card = document.createElement("div");
            card.style.border = "1px solid black";
            card.style.padding = "10px";
            card.style.margin = "10px";
            card.style.backgroundColor = movie.watched ? "#b6fcb6" : "#f5f5f5";

            let title = document.createElement("h3");
            title.textContent = movie.title;

            let info = document.createElement("p");
            info.textContent = "Género: " + movie.genre + " Año: " + movie.releaseYear + " Tipo: " + movie.type;

            let status = document.createElement("p");
            status.textContent = movie.watched ? "Vista" : "No vista";

            let button = document.createElement("button");
            button.textContent = "Marcar como vista";

            button.addEventListener("click",()=>
            {
                movie.watched = true;
                card.style.backgroundColor = "#207920ff";
                status.textContent = "Vista";
                button.disabled = true; 
            });

            card.appendChild(title);
            card.appendChild(info);
            card.appendChild(status);
            card.appendChild(button);

            container.appendChild(card);
        });

    }
    catch(error)
    {
        console.error("error:", error);
    }
}

initApp();