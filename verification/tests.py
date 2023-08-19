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
        },
        {
            "input": [[(7, 0), (11, 0)], 15],
            "answer": 2,
        },
        {
            "input": [[(4, 0), (6, 0)], 11],
            "answer": None,
        },
        {
            "input": [[(7, 1), (10, 4), (13, 1), (18, 4)], 28],
            "answer": 3,
        },
    ],
    "Extra": [
        {
            "input": [[(13, 1), (14, 3)], 22],
            "answer": 16,
        },
        {
            "input": [[(10, 1), (13, 4)], 15],
            "answer": None,
        },
    ]
}
