export class People {
    constructor(name, homeworld, hair_color, eye_color, birth_year, gender, uid) {
        this.name = name
        this.homeworld = homeworld
        this.hair_color = hair_color
        this.eye_color = eye_color
        this.birth_year = birth_year
        this.gender = gender
        this.uid = uid
    }

    get_name() {
        return this.name;
    }

    get_homeworld() {
        return this.homeworld;
    }

    get_hair_color() {
        return this.hair_color;
    }

    get_eye_color() {
        return this.eye_color;
    }

    get_birth_year() {
        return this.birth_year;
    }

    get_gender() {
        return this.gender;
    }

    get_uid() {
        return this.uid;
    }
}