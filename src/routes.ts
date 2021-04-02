import {EstablishmentController} from "./controller/EstablishmentController";

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
}];