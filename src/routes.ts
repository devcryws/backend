import {EstablishmentController} from "./controller/EstablishmentController";
import {CategoryController} from "./controller/CategoryController";
import {ComplementController} from "./controller/ComplementController";
import {ProductController} from "./controller/ProductController";

export const Routes = [{
    method: "get",
    route: "/establishments",
    controller: EstablishmentController,
    action: "all"
}, {
    method: "get",
    route: "/establishments/:id",
    controller: EstablishmentController,
    action: "one"
}, {
    method: "post",
    route: "/establishments",
    controller: EstablishmentController,
    action: "save"
}, {
    method: "delete",
    route: "/establishments/:id",
    controller: EstablishmentController,
    action: "remove"
},{
    method: "post",
    route: "/establishments/login",
    controller: EstablishmentController,
    action: "login"
}, {
    method: "get",
    route: "/categories",
    controller: CategoryController,
    action: "all"
}, {
    method: "get",
    route: "/categories/:id",
    controller: CategoryController,
    action: "one"
}, {
    method: "post",
    route: "/categories",
    controller: CategoryController,
    action: "save"
},{
    method: "put",
    route: "/categories/:id",
    controller: CategoryController,
    action: "update"
}, {
    method: "delete",
    route: "/categories/:id",
    controller: CategoryController,
    action: "remove"
},{
    method: "get",
    route: "/complements",
    controller: ComplementController,
    action: "all"
}, {
    method: "get",
    route: "/complements/:id",
    controller: ComplementController,
    action: "one"
}, {
    method: "post",
    route: "/complements",
    controller: ComplementController,
    action: "save"
},{
    method: "put",
    route: "/complements/:id",
    controller: ComplementController,
    action: "update"
}, {
    method: "delete",
    route: "/complements/:id",
    controller: ComplementController,
    action: "remove"
},{
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "all"
}, {
    method: "post",
    route: "/products",
    controller: ProductController,
    action: "save"
}];