
const registry = {
    name: {
        age: {
            role: {
                type: {}
            },
            type: {
                role: {}
            }
        },
        role: {
            age: {
                type: {}
            },
            type: {
                age: {}
            },
        },
        type: {
            role: {
                age: {}
            },
            age: {
                role: {}
            }
        }
    },
    age: {
        age: {
            role: {
                type: {}
            },
            type: {
                role: {}
            }
        },
        role: {
            age: {
                type: {}
            },
            type: {
                age: {}
            },
        },
        type: {
            role: {
                age: {}
            },
            age: {
                role: {}
            }
        }
    },
    role: {
        age: {
            role: {
                type: {}
            },
            type: {
                role: {}
            }
        },
        role: {
            age: {
                type: {}
            },
            type: {
                age: {}
            },
        },
        type: {
            role: {
                age: {}
            },
            age: {
                role: {}
            }
        }
    },
    type: {
        age: {
            role: {
                type: {}
            },
            type: {
                role: {}
            }
        },
        role: {
            age: {
                type: {}
            },
            type: {
                age: {}
            },
        },
        type: {
            role: {
                age: {}
            },
            age: {
                role: {}
            }
        }
    },
};

export const calculate = (componentNumber: number) => {
    let multiplications = [];

    for (let i = componentNumber; i > 0; i--) {
        multiplications.push(i);
    }

    let middleResult = [];

    for (let i = multiplications.length - 1; i > 0; i--) {
        const number = multiplications[i];
        const prevNumber = multiplications[i - 1];

        middleResult.push(number * prevNumber);
    }

    const result = middleResult.reduce((acc, value) => {
        return acc * value;
    }, 1);

    console.log(multiplications, middleResult, result);
};

calculate(4);
