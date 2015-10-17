var cities = {};

init();

function init()
{
    var DOMcities = document.getElementsByClassName("City");
    for (i = 0; i < DOMcities.length; i++)
    {
        
        cities[i] = new City(DOMcities[i].children.name.innerHTML);
        console.log(cities[i].getName());
    }
}

function City(name)
{
    this.city = {};

    this.city["name"] = name;

    this.getName = function()
    {
        return this.city["name"];
    }

    this.getTemp = function()
    {
        this.city["temperature"] = "test";
        return this.city["temperature"];
    }
}
