import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import {
  getOwnerByEmail,
  fetchAnimalByOwnerEmail,
  allPetshops,
  fetchServicesByPetshopId,
  submitService
} from "../../helper.js";
import { Snackbar } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class Services extends React.Component {
  state = {
    Agenda: "2018-09-19",
    dono: {
      Nome: "",
      Email: 0
    },
    animal: {
      idAnimal: 0,
      Nome: 0
    },
    email_dono: "",
    petshops: [],
    idPetshop: 0,
    servicos: [],
    idPetshopServico: 0,
  };

  componentDidMount = () => {
    allPetshops().then(response => this.setState({ petshops: response }));
  };

  getServices = idPetshop => {
    fetchServicesByPetshopId(idPetshop).then(response =>
      this.setState({ servicos: response })
    );
  };

  getAnimal = email => {
    fetchAnimalByOwnerEmail(email).then(response =>
      this.setState({ animal: response[0] })
    );
  };

  getOwner = () => {
    getOwnerByEmail(this.state.email_dono).then(response => {
      if (response.RG) {
        this.setState({ dono: response });
        this.getAnimal(response.Email);
      } else {
        alert("Nenhum dono com esse e-mail");
      }
    });
  };

  handleChange = name => event => {
    if (name === "idPetshop") {
      this.setState({
        [name]: event.target.value
      });
      this.getServices(event.target.value);
    } else {
      this.setState({
        [name]: event.target.value
      });
    }
  };

  renderPetshops = () => {
    var component_array = [];
    var petshops = this.state.petshops;
    petshops.forEach(function(arrayItem) {
      component_array.push(
        <MenuItem value={arrayItem.idPetshop} key={arrayItem.idPetshop}>
          {arrayItem.Nome}
        </MenuItem>
      );
    });
    return component_array;
  };

  renderServices = () => {
    var component_array = [];
    var servicos = this.state.servicos;
    servicos.forEach(function(arrayItem) {
      component_array.push(
        <MenuItem value={arrayItem.idPetshopServico} key={arrayItem.idServico}>
          {arrayItem.Nome}
        </MenuItem>
      );
    });
    return component_array;
  };

  submitService = () => {
    var service = {
      idAnimal: this.state.animal.idAnimal,
      idPetshopServico: this.state.idPetshopServico,
      Agenda: this.state.Agenda
    };
    submitService(service).then(response => {
      if (response === "SUCCESS") {
        alert("Cadastro realizado com sucesso!");
      } else {
        alert("Ocorreu um erro. Tente cadastrar novamente.");
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Serviços</h4>
                  <p className={classes.cardCategoryWhite}>
                    Cadastre um serviço para um animal
                  </p>
                </CardHeader>
                <CardBody>
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                  >
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="email_dono_animal"
                          label="E-mail do Dono"
                          className={classes.textField}
                          value={this.state.email_dono}
                          onChange={this.handleChange("email_dono")}
                          margin="normal"
                          fullWidth
                        />
                        <Button color="primary" onClick={this.getOwner}>
                          Verificar dono
                        </Button>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        style={{ marginTop: "32px" }}
                      >
                        <Select
                          value={this.state.dono.Email}
                          inputProps={{
                            label: "dono",
                            id: "dono"
                          }}
                          fullWidth
                        >
                          <MenuItem value={0} disabled>
                            Nenhum Dono
                          </MenuItem>
                          <MenuItem value={this.state.dono.Email}>
                            {this.state.dono.Nome}
                          </MenuItem>
                        </Select>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        style={{ marginTop: "32px" }}
                      >
                        <Select
                          value={this.state.animal.Nome}
                          inputProps={{
                            label: "animal",
                            id: "animal"
                          }}
                          onChange={this.handleChange("animal")}
                          fullWidth
                        >
                          <MenuItem value={0} disabled>
                            Nenhum Animal
                          </MenuItem>
                          <MenuItem value={this.state.animal.Nome}>
                            {this.state.animal.Nome}
                          </MenuItem>
                        </Select>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        style={{ marginTop: "32px" }}
                      >
                        <Select
                          value={this.state.idPetshop}
                          inputProps={{
                            label: "petshop",
                            id: "petshop"
                          }}
                          onChange={this.handleChange("idPetshop")}
                          fullWidth
                        >
                          <MenuItem value={0} disabled>
                            Nenhum Petshop
                          </MenuItem>
                          {this.renderPetshops()}
                        </Select>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        style={{ marginTop: "32px" }}
                      >
                        <Select
                          value={this.state.idPetshopServico}
                          inputProps={{
                            label: "servicos",
                            id: "servicos"
                          }}
                          onChange={this.handleChange("idPetshopServico")}
                          fullWidth
                        >
                          <MenuItem value={0} disabled>
                            Nenhum Serviço
                          </MenuItem>
                          {this.renderServices()}
                        </Select>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={12}
                        style={{ marginTop: "32px" }}
                      >
                        <TextField
                          id="dataNascimento"
                          label="Data de Nascimento"
                          type="date"
                          value={this.state.Agenda}
                          onChange={this.handleChange("dataNascimento")}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true
                          }}
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                  </form>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={this.submitService}>
                    Cadastrar
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <Snackbar open={this.state.open} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Services);
