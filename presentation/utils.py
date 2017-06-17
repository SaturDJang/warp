import re


def tag_splitter(tags):
    # re.split('a, b c,d', param) -> result: ['a','b','c','d']
    tag_split_regex = ',\s|,|\s'
    return list(filter(lambda x: 0 < len(x), re.split(tag_split_regex, tags)))


def comma_joiner(tags):
    return ', '.join(t.name for t in tags)
