let setId;
const setIdFunction = (id) => {
      setId = id;
}

const getIdFunction = () => {
      return new Promise((resolve, reject) => {
          const urlParams = new URLSearchParams(window.location.search);
      const dormitoryId = urlParams.get('id');
      
            if (dormitoryId) {
                  resolve(dormitoryId);
            } else {
                  reject(new Error('Dormitory ID not available'));
            }
      });
  };

export { setIdFunction, getIdFunction };