import RoutesHelper from './routesListing';
import userRoutes from './../routes/users';
import pointRoutes from './../routes/points';
import mapRoutes from './../routes/map';
import activityRoutes from './../routes/activities';

// List all routes.
RoutesHelper.print('/users',  userRoutes.stack);
RoutesHelper.print('/points', pointRoutes.stack);
RoutesHelper.print('/map', mapRoutes.stack);
RoutesHelper.print('/activity', activityRoutes.stack);