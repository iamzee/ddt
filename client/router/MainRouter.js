import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';
import Container from '../components/container';
import LoginView from '../views/loginView';
import SignupView from '../views/signupView';
import AddTradeView from '../views/addTradeView';
import AccountView from '../views/accountView';
import SetupView from '../views/setupView';
import WeekdayReportView from '../views/weekdayReportView';
import ListTradeView from '../views/listTradeView';
import EntryTimeReportView from '../views/entryTimeReportView';
import TradeDetailView from '../views/tradeDetailView';
import CalendarView from '../views/calendarView';
import DashboardView from '../views/dashboardView';
import EditTradeView from '../views/editTradeView';
import PercentReturnReportView from '../views/pecentReturnReportView';
import SetupReportView from '../views/setupReportView';
import TradeDurationReportView from '../views/tradeDurationReportView';

const MainRouter = () => {
	return (
		<BrowserRouter>
			<Container>
				<Switch>
					<PrivateRoute
						path="/reports/percentReturn"
						component={PercentReturnReportView}
					/>
					<PrivateRoute
						path="/reports/weekday"
						component={WeekdayReportView}
					/>
					<PrivateRoute
						path="/reports/tradeDuration"
						component={TradeDurationReportView}
					/>
					<PrivateRoute
						path="/reports/setup"
						component={SetupReportView}
					/>
					<PrivateRoute
						path="/reports/entryTime"
						component={EntryTimeReportView}
					/>
					<PrivateRoute path="/setups" component={SetupView} />
					<PrivateRoute path="/trades/add" component={AddTradeView} />
					<PrivateRoute
						path="/trades/:id/edit"
						component={EditTradeView}
					/>
					<PrivateRoute
						path="/trades/:id"
						component={TradeDetailView}
					/>
					<PrivateRoute path="/trades" component={ListTradeView} />

					<PrivateRoute path="/calendar" component={CalendarView} />

					<PrivateRoute path="/dashboard" component={DashboardView} />

					<PrivateRoute path="/account" component={AccountView} />
					<Route path="/signup" component={SignupView} />
					<Route path="/login" component={LoginView} />
				</Switch>
			</Container>
		</BrowserRouter>
	);
};

export default MainRouter;
