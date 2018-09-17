import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "@material-ui/core/Button";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Search from "@material-ui/icons/Search";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";

import { fetchOwners, fetchAnimals } from "../../helper.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class Querys extends React.Component {
  state = {
    animals: [],
    owners: [],
    products: [],
    services: []
  };

  componentDidMount() {
    fetchOwners().then(response => this.setState({ owners: response }));
    fetchAnimals().then(response => {
      var array = [];
      response.forEach(function(arrayItem) {
        arrayItem.dataNascimento = arrayItem.dataNascimento.substring(0, 10);
        arrayItem.idAnimal = arrayItem.idAnimal.toString();
        var subarray = [
          arrayItem.idAnimal,
          arrayItem.Nome,
          arrayItem.nomeRaca,
          arrayItem.nomeTipo,
          arrayItem.dataNascimento,
          arrayItem.Sexo
        ];
        array.push(subarray);
      });
      this.setState({ animals: array });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              formControlProps={{
                className: classes.margin + " " + classes.search
              }}
              inputProps={{
                placeholder: "Pesquisar",
                inputProps: {
                  "aria-label": "Search"
                }
              }}
            />
            <Button color="default" aria-label="edit" round="true">
              <Search />
            </Button>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Consultas</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "ID",
                    "Nome",
                    "Raça",
                    "Tipo",
                    "Sexo",
                    "Data de Nascimento"
                  ]}
                  tableData={this.state.animals}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Querys);
