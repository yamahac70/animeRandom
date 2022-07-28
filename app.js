const e=id=>document.getElementById(id);

const traducir=async (palabra)=>{
    console.log(palabra.toString())
    const q={
        q:palabra,
        source:"en",
        target:"es"
    }
    const tras=` While vacationing with his adopted daughter, Private Detective Susuki becomes trapped in a secluded ski resort with a few other vacationers after a storm closes the place down. All is well until one of the guests is found brutally murdered. Being the good investigator he is, Susuki gets to work to find the killer. While digging for the killer, Susuki uncovers a lot of dirt on the other guests and even finds out a thing or two about his own past. But, as Susuki struggles to find the killer, the other guests start to point the finger at him.`
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'fdec87dd09mshfed771e947624f8p17def5jsn3ebb6bd349b9',
            'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
        },
        //body: '{"q":"'+palabra+'","source":"en","target":"es"}'
        body: JSON.stringify(q)
    };
    
    const res=await fetch('https://deep-translate1.p.rapidapi.com/language/translate/v2', options)
    const data=await res.json();
    console.log(data)
    return data.data.translations.translatedText;
    
}



const getAnime = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fdec87dd09mshfed771e947624f8p17def5jsn3ebb6bd349b9',
            'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
        }
    };
    try {
        const res= await fetch(`https://anime-db.p.rapidapi.com/anime/by-id/${id}`, options);
        console.log(await res.status);
        await res.status===404?(cambios()):null;
        const data = await res.json();
       /*  data.status===400?console.log("error"):console.log("ok");
        data.status===200?console.log("ok"):console.log("error"); */
        return data;
    } catch (error) {
        console.log(error)
        const res= await fetch(`https://anime-db.p.rapidapi.com/anime/by-id/${id+1}`, options);
        const data = await res.json();
        return data;
    }
    
}
const randomAnime = async (desde=0,hasta=479) => {
    const id = Math.floor(Math.random() * (hasta - desde + 1)) + desde;
    const anime = await getAnime(id);
    return anime;
}
const cambios=async()=>{
    const generosEtiquetas=(array)=>{
        let etiquetas="";
        array.forEach(element => {
            etiquetas+=`<span class="etiqueta">${element}</span>`;
        }
        );
        return etiquetas;
    }
    e("sider").innerHTML="cargando"
    e("descripcion").innerHTML="cargando"
    const anime=await randomAnime();
    const desc= await traducir(anime.synopsis);
    e("sider").style.backgroundImage=`url(${anime.image})`;
    e("sider").innerHTML=/*HTML*/`
                    <div class="sider-titulo">
                            <h2>${anime.title}</h2>
                            <div class="datos">
                                <h3>Episodios: ${anime.episodes}</h3>
                                <h3>Generos: ${generosEtiquetas(anime.genres)}</h3>
                                <h3>Estado:Finished Airing</h3>
                                <a href="https://m.facebook.com/search/videos/?q=${anime.title}%20cap%201&source=filter&isTrending=0&tsid=0.37730819774913127" target="_blanck"> Buscar en facebook</a>
                            </div>
                        </div>
    `
    e("descripcion").innerHTML=desc
}
//cambios();
e("generar").addEventListener("click",cambios);