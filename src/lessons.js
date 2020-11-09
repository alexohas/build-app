/* eslint-disable */
var randomWords = require("random-words");

const locations = ["Abbeville", "Abbotsford", "Abbott", "Abbottstown", "Abercrombie", "Aberdeen", "Aberdeen Proving Ground", "Abernathy", "Abilene", "Abingdon", "Abington", "Abington Township", "Abiquiu", "Abita Springs", "Abrams", "Absarokee", "Absecon", "Acampo", "Access", "Accident", "Accokeek", "Accomac", "Accord", "Accoville", "Achille", "Achilles", "Ackerly", "Ackerman", "Ackley", "Acme", "Acton", "Acushnet", "Acworth", "Ada", "Adah", "Adair", "Adairsville", "Adairville", "Adak", "Adams", "Adams Center", "Adams Run", "Adamstown", "Adamsville", "Addieville", "Addis", "Addison", "Addyston", "Adel", "Adelanto", "Adell", "Adena", "Adger", "Adin", "Adkins", "Admire", "Adolphus", "Adona", "Adrian", "Advance", "Afton", "Agar", "Agate", "Agawam", "Agency", "Agoura Hills", "Agra"]

export const lessons = function (size) {
    let less = []
    for (let index = 1; index <= size; index++) {
        less[index] = {
            lesson: randomWords({ exactly: 2, join: " " }),
            location: locations[index],
            price: index * 10,
            space: index * 20,
            image: "https://picsum.photos/200/300"
       }
    }
    return less
}
