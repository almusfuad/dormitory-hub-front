const getParams = () => {
      const param = new URLSearchParams(window.location.search).get("slug");
      console.log(param);

      fetch(`https://dormitory-hub.onrender.com/dormitories/list/?slug=${param}`)
            .then((res) => res.json())
            .then((data) => {
                  console.log(data);
            })
}


const details = (slug) => {

      console.log(slug);
      
      fetch(`https://dormitory-hub.onrender.com/dormitories/list/?slug=${slug}`)
            .then((res) => res.json())
            .then((data) => {
                  console.log(data);
                  const queryParams = new URLSearchParams(data.slug).toString();
                  window.location.href =  `dormitory/dormitory_details.html?${queryParams}`;
            })
            .catch((err) => {
                  console.error(err);
            })
};

getParams();