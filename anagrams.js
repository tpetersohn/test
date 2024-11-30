function anagramsOf(string) {
                                        //t
    if(string.length === 1) {return string[0];}
    
    const collection = []

    const substringAnagrams = anagramsOf(string.slice(1))
                                        //t,        at,             cat
                                        //t,        a,              c
                                        //[t],      [at, ta],       [cat, act, atc, cta, tca, tac],
    for (const substringAnagram of substringAnagrams) {

        for (let index = 0; index <= substringAnagram.length; index += 1) {
                                                    //[],t                                         //t,[]
            const newString = substringAnagram.slice(0, index) + string[0] + substringAnagram.slice(index)
            collection.push(newString)                              //a
                                                                    //c
        }                                                           


    }

    return collection

}

console.log(anagramsOf("cat"))