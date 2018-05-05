import RoutesHelper from './routesListing';
import userRoutes from './../routes/users';
import pointsRoutes from './../routes/points';
import mapRoutes from './../routes/map';

// List all routes.
RoutesHelper.print('/users',  userRoutes.stack);
RoutesHelper.print('/points', pointsRoutes.stack);
RoutesHelper.print('/map', mapRoutes.stack);