const styles = theme => ({
  contentWrapper: {
    padding: '24px',
    border: '1px solid #f5f5f5',
    borderRadius: '6px',
  },
  bigShadow: {
    boxShadow: '2px 2px 8px #cecece'
  },
  smallShadow: {
    boxShadow: '2px 2px 10px #fafafa'
  },
  planSubtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 0px'
  },
  planDetail: {
    display: 'flex',
    alignItems: 'center'
  },
  planGrid: {
    display: 'grid',
    gridTemplateColumns: '30fr 10fr 10fr',
    alignItems: 'center'
  },
  planUsageWrapper: {
    width: '100%',
    height: '5px',
    backgroundColor: '#eee',
    borderRadius: '16px'
  },
  planUsageText: {
    textAlign: 'right',
    paddingRight: '10px'
  },
  planUsage: {
    float: 'left',
    height: '100%',
    background: 'linear-gradient(270deg,#4aabed,#8966b5)',
    borderRadius: '16px',
    transition: 'width .6s ease'
  },
  boldFont: {
    fontWeight: '900',
  },
  mt20: {
    marginTop: '20px'
  },
  mt30: {
    marginTop: '30px'
  },
  mt50: {
    marginTop: '50px'
  },
  mt70: {
    marginTop: '70px'
  },
  mb20: {
    marginBottom: '20px'
  },
  mb30: {
    marginBottom: '30px'
  },
  mb40: {
    marginBottom: '40px'
  },
  billSubItem: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column'
  },
  billSubText: {
    fontSize: '1.5rem',
    marginBottom: '20px'
  },
  billDetailCaptionWrapper: {
    minWidth: '280px'
  },
  billDetailCaption: {
    marginBottom: '20px'
  },
  billDetailValue: {
    fontWeight: '900',
    marginBottom: '20px'
  },
  qaTitle: {
    fontWeight: '900',
    color: '#555',
    fontSize: '1.2rem'
  },
  qaSubTitle: {
    fontWeight: '900',
    fontSize: '1rem'
  },
  upgradeprofilesummary: {
    paddingLeft: '30px',
    paddingTop: '15px',
    display: 'grid', 
    gridTemplateColumns: '.7fr 1fr'
  },
  upgradeprofilesummarysub: {
    display: 'flex',
    alignItems: 'center'
  },
  upgradeselect: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    minWidth: '61.5rem',
  },
  upgradeplanitem: {
    position: 'relative',
    display: 'flex',
    flex: '.32',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: '12rem',
    height: '20rem',
    padding: '1rem .5rem',
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '6px',
    boxShadow: '0 0 8px #eee'
  },
  upgradeplantitle: {
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center'
  },
  upgradeenterprise: {
    color: '#fa8f38'
  },
  upgradeenterprisebtn: {
    border: '1px solid #fa8f38 !important',
    borderRadius: '2px !important',
    backgroundColor: '#fa8f38 !important',
    color: 'white !important'
  },
  upgradeadvanced: {
    color: '#8966b5'
  },
  upgradeadvancedbtn: {
    border: '1px solid #8966b5 !important',
    borderRadius: '2px !important',
    backgroundColor: '#8966b5 !important',
    color: 'white !important'
  },
  upgradeperformance: {
    color: '#114b5f'
  },
  upgradeperformancebtn: {
    border: '1px solid #114b5f !important',
    borderRadius: '2px !important',
    backgroundColor: '#114b5f !important',
    color: 'white !important'
  },
  upgradeessentials: {
    color: '#4aabed'
  },
  upgradeessentialsbtn: {
    border: '1px solid #4aabed !important',
    borderRadius: '2px !important',
    backgroundColor: '#4aabed !important',
    color: 'white !important'
  },
  upgradetrial: {
    color: '#739dac'
  },
  upgradetrialbtn: {
    border: '1px solid #739dac !important',
    borderRadius: '2px !important',
    backgroundColor: '#739dac !important',
    color: 'white !important'
  },
  upgradeplanbutton: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginRight: 'auto',
    marginLeft: 'auto'
  },

  upgradeplandetail: {
    height: '3rem',
    marginTop: '.5rem',
    marginBottom: '1.5rem',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: '.9rem'
  },
  upgradeplanmoney: {
    fontWeight: '700',
    fontSize: '28px',
    lineHeight: '50px',
    textAlign: 'center'
  },
  upgradeplanperiod: {
    fontSize: '.9rem'
  },
  upgradeplandivide: {
    height: '2rem',
    fontSize: '14px'
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
  passwordresetdlg: {
    width: '450px',
    height: 'fit-content',
    position: 'fixed',
    top: 'calc(50vh - 280px)',
    left: 'calc(50vw - 460px)',
    zIndex: '9999',
    border: '1px solid #00000089',
    padding: '2rem',
    background: '#fff',
    boxShadow: '0px 0px 9px #00000069'
  },
  editdlg: {
    top: '0 !important',
    left: 'calc(50vw - 460px) !important',
  },
  passwordinput: {
    display: 'grid', 
    gridTemplateColumns: '2fr 3fr', 
    alignItems: 'center',
    marginTop:'1rem', 
  }
});

export default styles;