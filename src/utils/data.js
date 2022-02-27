export const categories = [
  {
    name: "Animals",
    image: "https://i.postimg.cc/0j36tpJg/kitten.jpg",
  },
  {
    name: "Funny Memes",
    image: "https://i.postimg.cc/5t7FYdNN/alr.png",
  },
  {
    name: "Cartoons",
    image: "https://i.postimg.cc/PxX8Nfk7/unnamed.jpg",
  },
  {
    name: "Gaming",
    image: "https://i.postimg.cc/xjFbTSps/jpg.jpg",
  },
  {
    name: "Nature",
    image: "https://i.postimg.cc/W3zbQdVs/k.jpg",
  },
  {
    name: "Tech",
    image:
      "https://i.postimg.cc/3wHG5CfY/shutterstock-1152185600-1440x1008-1-857x600.jpg",
  },
  {
    name: "Education",
    image:
      "https://i.postimg.cc/XJsB5MjY/Reconstructing-education-through-a-global-lens-2020-09-16-6309.jpg",
  },
  {
    name: "Sport",
    image: "https://i.postimg.cc/fTGtmfNm/20008365.jpg",
  },
  {
    name: "Food",
    image: "https://i.postimg.cc/Hnq9FHCY/salad.png",
  },
  {
    name: "Science",
    image: "https://i.postimg.cc/CMRTyNVX/science.png",
  },
  {
    name: "Geography",
    image: "https://i.postimg.cc/C5B4v5Xr/sssssss.jpg",
  },
  {
    name: "History",
    image: "https://i.postimg.cc/gJBDq8S6/egypt.png",
  },
  {
    name: "More",
  },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
