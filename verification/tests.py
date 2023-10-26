"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": [[(1, 0), (2, 0)], 2],
            "answer": 0,
            "explanation": [],
        },
        {
            "input": [[(7, 0), (11, 0)], 15],
            "answer": 2,
            "explanation": [[7, [0]], [11, [0]]],
        },
        {
            "input": [[(4, 0), (6, 0)], 11],
            "answer": None,
            "explanation": [],
        },
        {
            "input": [[(7, 1), (10, 4), (13, 1), (18, 4)], 28],
            "answer": 3,
            "explanation": [[7, [0]], [10, [3]], [15, [3]]],
        },
    ],
    "Extra": [
        {
            "input": [[(13, 1), (14, 3)], 22],
            "answer": 9,
            "explanation": [[13, [0]], [14, [0, 1]], [15, [0, 1]], [16, [0, 1]], 
                            [17, [0, 1]], [18, [0, 1]], [19, [0, 1]], [20, [0, 1]], [21, [1]]],
        },
        {
            "input": [[(10, 1), (13, 4)], 15],
            "answer": None,
            "explanation": [],
        },
    ]
}
