import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Table from "components/Table/Table.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/dog.png";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import {
  allClients,
  fetchPendingAnimalServices,
  fetchCompleteAnimalServicesSum,
  fetchCompleteAnimalServices,
  fetchAnimalByOwnerId
} from "../../helper.js";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class OwnerPage extends React.Component {
  state = {
    totalSpent: 0,
    purchases: [],
    pet: {},
    nextAppointments: [],
    ownerRG: 378740064
  };

  componentDidMount() {
    fetchAnimalByOwnerId(this.state.ownerRG)
      .then(response => this.setState({ pet: response[0] }))
      .then(() => {
        allClients().then(response => this.setState({ clients: response.num }));
        fetchCompleteAnimalServices(this.state.pet.idAnimal).then(response => {
          var array = [];
          response.forEach(function(arrayItem) {
            arrayItem.Agenda = arrayItem.Agenda.substring(0, 10);
            var subarray = [
              arrayItem.nomeServico,
              arrayItem.nomePetshop,
              arrayItem.Endereco,
              "R$" + arrayItem.Preco.toString() + "0",
              arrayItem.Agenda
            ];
            array.push(subarray);
          });
          this.setState({ purchases: array });
        });
        fetchCompleteAnimalServicesSum(this.state.pet.idAnimal).then(response =>
          this.setState({ totalSpent: response.num })
        );
        fetchPendingAnimalServices(this.state.pet.idAnimal).then(response =>
          this.setState({ nextAppointments: response })
        );
      });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  renderServices = () => {
    const { classes } = this.props;
    var component_array = [];
    var nextAppointments = this.state.nextAppointments;
    nextAppointments.forEach(function(arrayItem) {
      component_array.push(
        <div key={arrayItem.idServico}>
          <h3 className={classes.cardTitle}>
            Dia: {arrayItem.Agenda.substring(0, 10)}
          </h3>
          <h3 className={classes.cardTitle}>
            PetShop: {arrayItem.nomePetshop}
          </h3>
          <h3 className={classes.cardTitle}>
            Preço: R$
            {arrayItem.Preco}0
          </h3>
        </div>
      );
    });
    return component_array;
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." className={classes.avatar} />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>Seu Pet</h6>
                <h4 className={classes.cardTitle}>{this.state.pet.Nome}</h4>
                <h4 className={classes.cardTitle}>
                  Tipo: {this.state.pet.tipoAnimal}
                </h4>
                <h4 className={classes.cardTitle}>
                  Raça: {this.state.pet.racaAnimal}
                </h4>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="info">
                  <Icon>alarm</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Próximos Serviços</p>
                {this.renderServices()}
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Existem serviços pendentes!
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Gasto com serviços</p>
                <h3 className={classes.cardTitle}>
                  R$
                  {this.state.totalSpent}0
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Último mês
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>shopping_cart</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Serviços comprados</p>
                <h3 className={classes.cardTitle}>
                  {this.state.purchases.length}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Atualizado agora
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Gastos</h4>
                <p className={classes.cardCategory}>
                  Número total de gasto por mês
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> atualizado há 1 dia atrás
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Últimos Gastos</h4>
                <p className={classes.cardCategoryWhite}>
                  Tabela com os últimos gastos do seu pet
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Serviço",
                    "PetShop",
                    "Endereço",
                    "Preço",
                    "Data"
                  ]}
                  tableData={this.state.purchases}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

OwnerPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(OwnerPage);
