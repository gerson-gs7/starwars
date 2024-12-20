export class Starship {

    constructor(name, model, price, cost_in_credits, manufacturer, crew, max_atmosphering_speed, hyperdrive_rating, starship_class) {
        this._name = name
        this._model = model
        this._price = price
        this._cost_in_credits = cost_in_credits
        this._manufacturer = manufacturer
        this._crew = crew
        this._max_atmosphering_speed = max_atmosphering_speed
        this._hyperdrive_rating = hyperdrive_rating
        this._starship_class = starship_class
    }
get_name(){
    return this._name
}
get_model(){
    return this._model
}
get_price(){
    return this._price
}
get_cost_in_credits(){
    return this._cost_in_credits
}
get_manufacturer(){
    return this._manufacturer
}
get_crew(){
    return this._crew
}
get_max_atmosphering_speed(){
    return this._max_atmosphering_speed
}
get_hyperdrive_rating(){
    return this._hyperdrive_rating
}
get_starship_class(){
    return this._starship_class
}

}
