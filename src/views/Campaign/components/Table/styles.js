const styles = theme => ({
  candidateItem: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",

    '&:Hover': {
      backgroundColor: theme.palette.clrVariables.cyanBlack
    }
  },
  feedtableCell: {
    padding: '4px'
  },
  feedtableTextField: {
    '& input': {
      padding: '4px'
    }
  }
});

export default styles;