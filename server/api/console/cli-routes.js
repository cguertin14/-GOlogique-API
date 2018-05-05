import RoutesHelper from './routesListing';
import userRoutes from './../routes/users';
import mapRoutes from './../routes/map';
import activityRoutes from './../routes/activities';
import feedbackRoutes from './../routes/feedback';

// List all routes.
RoutesHelper.print('/users',  userRoutes.stack);
RoutesHelper.print('/map', mapRoutes.stack);
RoutesHelper.print('/activity', activityRoutes.stack);
RoutesHelper.print('/feedbacks', feedbackRoutes.stack);