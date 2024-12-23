export class Planet{
    constructor(name, rotation_period, orbital_period, climate, gravity, terrain, population){
        this._name = name,
        this._rotation_period = rotation_period,
        this.orbital_period = orbital_period,
        this._climate = climate,
        this._gravity = gravity,
        this._terrain = terrain,
        this._population = population
    }
    getName(){
        return this._name
    }
    getRotation_period(){
        return this._rotation_period
    }
    getOrbital_period(){
        return this._orbital_period
    }
    getClimate(){
        return this._climate
    }
    getGravity(){
        return this._gravity
    }
    getTerrain(){
        return this._terrain
    }
    getPupulation(){
        return this._population
    }
}
