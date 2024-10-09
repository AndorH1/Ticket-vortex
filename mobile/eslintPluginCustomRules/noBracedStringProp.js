const noBracedStringProp = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "Disallow passing string values to props using x={'y'} format",
      category: 'Best Practices',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
  },
  create: function (context) {
    return {
      JSXAttribute(node) {
        if (
          node.value &&
          node.value.expression &&
          node.value.expression.type === 'Literal' &&
          typeof node.value.expression.value === 'string'
        ) {
          context.report({
            node,
            message: "Pass string values to props using x='y' format instead of x={'y'}",
            fix: function (fixer) {
              const propValue = node.value.expression.value;
              return fixer.replaceText(node.value, `'${propValue}'`);
            },
          });
        }
      },
    };
  },
};

module.exports = noBracedStringProp;
