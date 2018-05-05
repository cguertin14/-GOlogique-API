import RoutesHelper from './routesListing';
import userRoutes from './../routes/users';
import pointsRoutes from './../routes/points';

// List all routes.
RoutesHelper.print('/users',  userRoutes.stack);
RoutesHelper.print('/points', pointsRoutes.stack);