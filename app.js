const e=id=>document.getElementById(id);

/* const traducir=async (palabra)=>{
    console.log(palabra.toString())
    const q={
        q:palabra,
        source:"en",
        target:"es"
    }
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
    
} */
const traducir=async(texto)=>{

    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", "en");
    encodedParams.append("target_language", "es");
    encodedParams.append("text", texto);
    
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'fdec87dd09mshfed771e947624f8p17def5jsn3ebb6bd349b9',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      body: encodedParams
    };
    
    const res=await fetch('https://text-translator2.p.rapidapi.com/translate', options)
    const data=await res.json();
    console.log(data)
    return data.data.translatedText
  
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