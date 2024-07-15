import userRouter from "./modules/user/user.router.js";
import categoriesRouter from "./modules/categories/categories.router.js";
import taskRouter from "./modules/tasks/task.router.js";


 const mountRoutes = (app) => {
    app.use("/user", userRouter); 
    app.use("/categories", categoriesRouter);
    app.use("/task", taskRouter);    
 };

 export default mountRoutes;  