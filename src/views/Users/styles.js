const styles = theme => ({
  underMargin: {
    marginBottom: '20px',
  },
  ellipseCaption: {
    padding: '.5rem',
    fontSize: '12px',
    overflow: 'hidden',
    lineHeight: 1.4,
    textOverflow: 'ellipsis',
    '-webkitBoxOrient': 'vertical',
    '-webkitLineClamp': 4,
  },
  settingInput: {
    padding: '0',
    width: '90px'
  },
  settingCellNoPadding: {
    padding: '.3rem',
  },
  userdetailwrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 3fr 7fr',
    padding: '.2rem 0'
  },
  userdetailwrappertitle: {
    fontWeight: 600,
    fontSize: '20px'
  },
  displayflex: {
    display: 'flex'
  },
  justifybetween: {
    justifyContent: 'space-between'
  },
  aligncenter: {
    alignItems: 'center'
  },
  barcandle: {
    marginLeft: '.5rem',
    width: '120px',
    height: '4px',
    background: '#eee'
  },
  barcandleprogress: {
    background: 'linear-gradient(270deg,#4aabed,#8966b5)',
    height: '100%'
  },
  passwordresetdlg: {
    width: '600px',
    height: '220px',
    position: 'fixed',
    top: 'calc(50vh - 110px)',
    left: 'calc(50vw - 300px)',
    zIndex: '9999',
    border: '1px solid',
    padding: '2rem',
    background: '#fff',
    boxShadow: '0px 0px 9px #00000029'
  }
});

export default styles;