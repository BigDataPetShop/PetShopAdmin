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
  fetchTypes,
  fetchBreeds,
  submitOwner,
  submitAnimal
} from "../../helper.js";

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

class UserProfile extends React.Component {
  state = {
    tipos: [],
    racas: [],
    nome: "",
    sexo: 0,
    tipo: 0,
    raca: 0,
    dataNascimento: "2018-09-19",
    nome_dono: "",
    email_dono: "",
    rg_dono: "",
    estado_dono: 0
  };

  componentDidMount = () => {
    fetchTypes().then(response => this.setState({ tipos: response }));
    fetchBreeds().then(response => this.setState({ racas: response }));
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  renderTypes = () => {
    var component_array = [];
    var tipos = this.state.tipos;
    tipos.forEach(function(arrayItem) {
      component_array.push(
        <MenuItem value={arrayItem.idTipo} key={arrayItem.idTipo}>
          {arrayItem.Nome}
        </MenuItem>
      );
    });
    return component_array;
  };

  renderBreeds = () => {
    var component_array = [];
    var racas = this.state.racas;
    racas.forEach(function(arrayItem) {
      component_array.push(
        <MenuItem value={arrayItem.idRaca} key={arrayItem.idRaca}>
          {arrayItem.Nome}
        </MenuItem>
      );
    });
    return component_array;
  };

  submitAnimal = () => {
    var animal = {
      Nome: this.state.nome,
      idRaca: this.state.raca,
      idTipo: this.state.tipo,
      Sexo: this.state.sexo,
      dataNascimento: this.state.dataNascimento,
      RG: this.state.rg_dono
    };
    var response = submitAnimal(animal);
    if (response === "FAILED") {
      alert("Ocorreu um erro. Tente cadastrar novamente.");
    }
  };

  submitOwner = () => {
    var owner = {
      Nome: this.state.nome_dono,
      RG: this.state.rg_dono,
      UF: this.state.estado_dono,
      Email: this.state.email_dono
    };
    var response = submitOwner(owner);
    if (response === "FAILED") {
      alert("Ocorreu um erro. Tente cadastrar novamente.");
    }
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
                  <h4 className={classes.cardTitleWhite}>Animal</h4>
                  <p className={classes.cardCategoryWhite}>
                    Cadastre um novo animal
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
                          id="rg_dono_animal"
                          label="RG do Dono"
                          className={classes.textField}
                          value={this.state.rg_dono}
                          onChange={this.handleChange("rg_dono")}
                          margin="normal"
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="name"
                          label="Nome do Animal"
                          className={classes.textField}
                          value={this.state.nome}
                          onChange={this.handleChange("nome")}
                          margin="normal"
                          fullWidth
                        />
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        style={{ marginTop: "32px" }}
                      >
                        <Select
                          value={this.state.sexo}
                          onChange={this.handleChange("sexo")}
                          inputProps={{
                            label: "sexo",
                            id: "sexo"
                          }}
                          fullWidth
                        >
                          <MenuItem value={0} disabled>
                            Sexo do Animal
                          </MenuItem>
                          <MenuItem value={"Masculino"}>Masculino</MenuItem>
                          <MenuItem value={"Feminino"}>Feminino</MenuItem>
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
                          value={this.state.tipo}
                          onChange={this.handleChange("tipo")}
                          inputProps={{
                            label: "tipo",
                            id: "tipo"
                          }}
                          fullWidth
                        >
                          <MenuItem value={0} disabled>
                            Tipo do Animal
                          </MenuItem>
                          {this.renderTypes()}
                        </Select>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        style={{ marginTop: "32px" }}
                      >
                        <Select
                          value={this.state.raca}
                          onChange={this.handleChange("raca")}
                          inputProps={{
                            label: "raca",
                            id: "raca"
                          }}
                          fullWidth
                          disabled={this.state.tipo !== 0 ? false : true}
                        >
                          <MenuItem value={0} disabled>
                            Raça do Animal
                          </MenuItem>
                          {this.renderBreeds()}
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
                          value={this.state.dataNascimento}
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
                  <Button color="primary" onClick={this.submitAnimal}>
                    Cadastrar
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>

        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Dono</h4>
                  <p className={classes.cardCategoryWhite}>
                    Cadastre um novo dono
                  </p>
                </CardHeader>
                <CardBody>
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                  >
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="name"
                          label="Nome"
                          className={classes.textField}
                          value={this.state.nome_dono}
                          onChange={this.handleChange("nome_dono")}
                          margin="normal"
                          fullWidth
                        />
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        style={{ marginTop: "32px" }}
                      >
                        <Select
                          value={this.state.estado_dono}
                          onChange={this.handleChange("estado_dono")}
                          inputProps={{
                            label: "estado",
                            id: "estado"
                          }}
                          fullWidth
                        >
                          <MenuItem value={0} disabled>
                            Estado
                          </MenuItem>
                          <MenuItem value={"SP"}>SP</MenuItem>
                          <MenuItem value={"RJ"}>RJ</MenuItem>
                        </Select>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="rg"
                          label="RG"
                          className={classes.textField}
                          value={this.state.rg_dono}
                          onChange={this.handleChange("rg_dono")}
                          margin="normal"
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="email"
                          label="E-mail"
                          className={classes.textField}
                          value={this.state.email_dono}
                          onChange={this.handleChange("email_dono")}
                          margin="normal"
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                  </form>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={this.submitOwner}>
                    Cadastrar
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
