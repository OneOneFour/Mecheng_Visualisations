
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ParticleSystem object to contain either Lithiums or Electrons
// Needed properties:
//      particles (array of Lithiums or Electrons)
//      particleType (either "Electron" or "Lithium", so we can tell the difference - might end up being unnecessary)
// Needed methods:
//      run()
//      addParticle()

class ParticleSystem {
    constructor(type){
        this.particles = [];
        this.particleType = type;
        if (this.particleType !== ("Electron") && this.particleType !== ("Lithium")) {
            throw "Invalid input - class ParticleSystem requires can only be Lithium or Electron";
        }
    }

    run(isRunning){
        for (let i=0; i<this.particles.length; i++) {
            //Do something to each particle
            let dead = this.particles[i].run(isRunning);
            if (dead) {
                this.particles.splice(i,1);
            }
        }
    };

    addParticle(x,y) {
        if (this.particleType === "Electron"){
            this.particles.push(new Electron(x,y));
        } else if (this.particleType === "Lithium") {
            this.particles.push(new Lithium(x,y));
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Particle object to hold info on a particle
// Needed properties:
//      charge
//      mass
//      position
//      velocity
//      acceleration
// Needed methods:
//      run()

class Particle {
    constructor(x,y) {
        this.charge = 0;

        this.position = {x: x, y: y};
        this.velocity = 0;
        this.acceleration = 0;
    }

    run(isRunning) {
        let isDead = 0;
        if (isRunning) {
            isDead = this.update();
        }
        if (!isDead) {
            this.render();
        }
    }

    update() {
        // Empty function; overwritten in subclasses
        return undefined
    }

    render() {
        // Empty function; overwritten in subclasses
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Electron extends Particle {
    constructor(x,y) {
        super(x,y);
        this.charge = -1;
        this.pathLength = 2;
    }

    update() {
        //TODO: Implement this
        let isDead = 0;
        return isDead;
    }

    render() {
        //TODO: Implement this
        fill('#fffc00');
        strokeWeight(0.1);
        ellipse(this.position.x, this.position.y,2,2);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Lithium extends Particle {
    constructor(x,y, split) {
        super(x,y);
        if (split){
            this.charge = 1;
        } else {
            this.charge = 0;
        }
        this.isSplit = split;
    }

    update() {
        //TODO: Implement this
        let isDead = false;
        this.position.x++;
        if (this.position.x >= posElec.x || this.position.x <= negElec.x + negElec.width) {
            isDead = true;
        }
        return isDead;
    }

    render() {
        //TODO: Implement this
        textAlign("CENTRE","CENTRE");
        textSize(3);
        if (this.isSplit) {
            fill('#ff0100');
            text('Li+',this.position.x,this.position.y);
        } else {
            fill('#000000');
            text('Li',this.position.x,this.position.y);
        }

        strokeWeight(0.1);
        ellipse(this.position.x, this.position.y,4,4);

    }

    split(Electrons) {
        if (this.isSplit === false) {
            Electrons.add(new Electron(this.position));
            this.isSplit = true;
            this.charge++;
        } else {
            console.log("Lithium atom is already ionised - cannot generate another electron!");
        }
    }
}
