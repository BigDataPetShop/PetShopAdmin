import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/marc.jpg";

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
    nome: "",
    sexo: "",
    tipo: "",
    raca: "",
    dataNascimento: "2018-09-19"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  submit = () => {
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;

    const styles = theme => ({
      container: {
        display: "flex",
        flexWrap: "wrap"
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
      },
      menu: {
        width: 200
      }
    });

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
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="name"
                          label="Nome"
                          className={classes.textField}
                          value={this.state.name}
                          onChange={this.handleChange("nome")}
                          margin="normal"
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="sexo"
                          label="Sexo"
                          className={classes.textField}
                          value={this.state.sexo}
                          onChange={this.handleChange("sexo")}
                          margin="normal"
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="tipo"
                          label="Tipo"
                          className={classes.textField}
                          value={this.state.tipo}
                          onChange={this.handleChange("tipo")}
                          margin="normal"
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="raca"
                          label="Raça"
                          className={classes.textField}
                          value={this.state.raca}
                          onChange={this.handleChange("raca")}
                          margin="normal"
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
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
                  <Button color="primary" onClick={this.submit}>
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
