export class Planet {

    constructor(name, rotation_period, orbital_period, climate, gravity, terrain, population){
        this._name = name,
        this._rotation_period = rotation_period,
        this.orbital_period = orbital_period,
        this._climate = climate,
        this._gravity = gravity,
        this._terrain = terrain,
        this._population = population
    }
    get_name(){
        return this._name
    }
    get_rotation_period(){
        return this._rotation_period
    }
    get_orbital_period(){
        return this._orbital_period
    }
    get_climate(){
        return this._climate
    }
    get_gravity(){
        return this._gravity
    }
    get_terrain(){
        return this._terrain
    }
    get_population(){
        return this._population
    }
}
