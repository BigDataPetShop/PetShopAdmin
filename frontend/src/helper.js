let API_URL;

process.env.NODE_ENV === "development"
  ? (API_URL = "http://localhost:3000/")
  : (API_URL = "");

export const fetchTypes = () => {
  return fetch(API_URL + "tipo")
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const fetchBreeds = () => {
  return fetch(API_URL + "raca")
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const fetchOwners = () => {
  return fetch(API_URL + "dono")
    .then(response => response.json())
    .then(data => {
      var array = [];
      data.forEach(function(arrayItem) {
        arrayItem.idDono = arrayItem.idDono.toString();
        arrayItem.RG = arrayItem.RG.toString();
        array.push(Object.values(arrayItem));
      });
      return array;
    });
};

export const getOwnerByEmail = email_dono => {
  return fetch(API_URL + "dono/email/" + email_dono)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const fetchAnimals = () => {
  return fetch(API_URL + "animal")
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const allClients = () => {
  return fetch(API_URL + "dono/count")
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const allPayments = idPetshop => {
  return fetch(API_URL + "animal/servico/sum/petshop/" + idPetshop)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const allPetshops = () => {
  return fetch(API_URL + "petshop")
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const fetchAllPendingAnimalServices = () => {
  return fetch(API_URL + "animal/servico/pending")
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const fetchPendingAnimalServices = idAnimal => {
  return fetch(API_URL + "animal/servico/pending/" + idAnimal)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const fetchCompleteAnimalServices = idAnimal => {
  return fetch(API_URL + "animal/servico/complete/" + idAnimal)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const fetchCompleteAnimalServicesSum = idAnimal => {
  return fetch(API_URL + "animal/servico/sum/" + idAnimal)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const fetchTop5 = () => {
  return fetch(API_URL + "animal/servico/top5")
    .then(response => response.json())
    .then(data => {
      var array = [];
      data.forEach(function(arrayItem) {
        arrayItem.Preco = arrayItem.Preco.toString();
        array.push(Object.values(arrayItem));
      });
      return array;
    });
};

export const submitOwner = owner => {
  return fetch(API_URL + "dono", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(owner)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      if (data.message) {
        return "SUCCESS";
      } else {
        return "FAILED";
      }
    });
};

export const submitAnimal = animal => {
  return fetch(API_URL + "animal", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(animal)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        return "SUCCESS";
      } else {
        return "FAILED";
      }
    });
};

export const submitService = service => {
  return fetch(API_URL + "animal/servico", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(service)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        return "SUCCESS";
      } else {
        return "FAILED";
      }
    });
};

export const fetchAnimalByOwnerEmail = Email => {
  return fetch(API_URL + "dono/animal/" + Email)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const fetchServicesByPetshopId = idPetshop => {
  return fetch(API_URL + "petshop/servico/" + idPetshop)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const closeServiceByAnimalServiceId = idAnimalServico => {
  return fetch(API_URL + "animal/servico/close", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ idAnimalServico: idAnimalServico })
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        return "SUCCESS";
      } else {
        return "FAILED";
      }
    });
};