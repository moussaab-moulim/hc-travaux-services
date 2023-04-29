const { writeFile } = require("fs");

const nodeFetch = require("node-fetch");
const axios = require("axios");
require("dotenv").config();

const getInstagramFeedGraphql = async () => {
  //console.log("lets get instagram", process.env.INSTAGRAM_API);
  // if (process.env.NODE_ENV !== 'production' || true) return [];

  const apiUrl = `https://instagram28.p.rapidapi.com/medias?user_id=6070880618&batch_size=8`;
  const apiOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9a683ddf55mshe821b964bdec877p1110dcjsnc82a490d4cb9",
      "X-RapidAPI-Host": "instagram28.p.rapidapi.com",
    },
  };

  const apiResposne = await nodeFetch(apiUrl, apiOptions);
  console.log("nodeFetch", apiResposne.status, apiResposne.statusText);
  if (apiResposne.status === 200) {
    //const instagramDataJson = await apiResposne.json();
    const instagramDataText = await apiResposne.text();
    const instagramDataJson = JSON.parse(instagramDataText);
    //console.log("instagramDataJson====", instagramDataJson);
    console.log("instagramDataTEXT", instagramDataText);
    console.log("do a pars ====", JSON.parse(instagramDataText));
    const instagramMedia =
      instagramDataJson.data?.user?.edge_owner_to_timeline_media?.edges ?? [];

    return instagramMedia.map((item) => {
      const image = item.node;
      const url = image.display_url;
      console.log("url=====", url);
      return {
        url: url,
        alt: "une image instagram depuis le profile d'coach melissa",
        linkTo: `https://www.instagram.com/p/${image.shortcode}/`,
      };
    });
  } else {
    return [];
  }
};

const getInstagramFeedRest = async () => {
  console.log("lets get instagram", process.env.INSTAGRAM_API);
  if (!process.env.INSTAGRAM_API) return [];
  const apiResposne = await nodeFetch(`${process.env.INSTAGRAM_API}?limit=8`);
  if (apiResposne.status === 200) {
    const instagramDataJson = await apiResposne.json();
    //const instagramDataText = await apiResposne.text();
    //const instagramDataJson = JSON.parse(instagramDataText);
    console.log("instagramDataJson====", instagramDataJson);
    //console.log("instagramDataTEXT", instagramDataText);
    //console.log("do a pars ====", instagramDataText);
    const instagramMedia = instagramDataJson?.data ?? [];

    return instagramMedia.map((item) => {
      const image =
        item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url;
      const url = item.permalink;
      console.log("url=====", url);
      return {
        url: image,
        alt: "une image instagram depuis le profile d'esteticarevolution",
        linkTo: url,
      };
    });
  } else {
    return [];
  }
  //if (process.env.NODE_ENV !== "production" || true) return [];
  /*   axios({
    method: "get",
    url: "https://v1.nocodeapi.com/moussaabmma/instagram/zQOiDEpzwvbXTyXk",
    params: {},
  })
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    }); */
};

const generateInstagramJson = async () => {
  const intaFeed = await getInstagramFeedRest();

  await writeFile("instagram.json", JSON.stringify(intaFeed), (err) => {
    if (err) throw err;

    console.log("Done creating instagram json");
  });
};

generateInstagramJson();
