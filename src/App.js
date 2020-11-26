import React from "react";

// Tabela
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Diálogo
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

// Ícones
import Switch from '@material-ui/core/Switch';
import Sync from '@material-ui/icons/Sync';
import Add from '@material-ui/icons/Add';
import logo from './assets/grupo_lider.png';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'modelo', numeric: false, disablePadding: true, label: 'Modelo' },
  { id: 'chassi', numeric: false, disablePadding: false, label: 'Chassi' },
  { id: 'placa', numeric: false, disablePadding: false, label: 'Placa' },
  { id: 'cor', numeric: false, disablePadding: false, label: 'Cor' },
  { id: 'km', numeric: true, disablePadding: false, label: 'KM' },
  { id: 'ano_fab', numeric: true, disablePadding: false, label: 'Ano Fabricação' },
  { id: 'ano_mod', numeric: true, disablePadding: false, label: 'Ano Modelo' },
  { id: 'valor_venda', numeric: true, disablePadding: false, label: 'Valor Venda' },
  { id: 'revenda', numeric: false, disablePadding: false, label: 'Revenda' },
  { id: 'situacao', numeric: false, disablePadding: false, label: 'Situação' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric = 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
  dialog: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  wrapper: {
    margin: 15,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);
  const [revenda, setRevenda] = React.useState('CVC CACHOEIRO');
  const [situacao, setSituacao] = React.useState('ESTOQUE');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const inputYear = { maxlength: 4 };
  const inputPlaca = { maxlength: 7 };
  const inputChassi = { maxlength: 17 };
  const [values, setValues] = React.useState({
    valor: '',
  });
  const revendas = [
    { value: 'CVC CACHOEIRO', label: 'CVC CACHOEIRO' },
    { value: 'CVC GUAÇUÍ', label: 'CVC GUAÇUÍ' },
    { value: 'BRACOM CACHOEIRO', label: 'BRACOM CACHOEIRO' }
  ];
  const situacoes = [
    { value: 'ESTOQUE', label: 'ESTOQUE' },
    { value: 'TRÂNSITO', label: 'TRÂNSITO' }
  ];

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClickSave = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setOpen(false);
      }, 2000);
    }
  };

  const handleChangeValue = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeRevenda = (event) => {
    setRevenda(event.target.value);
  };

  const handleChangeSituacao = (event) => {
    setSituacao(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setSuccess(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          <img src={logo} width="150px" alt="logo" />
        </Typography>

        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          ESTOQUE DE USADOS
        </Typography>

        <Tooltip title="Adicionar Veículo">
          <IconButton aria-label="add car" onClick={handleClickOpen}>
            <Add />
          </IconButton>
        </Tooltip>

        <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Adicionar Veículo</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="modelo" label="Modelo" />
            <TextField margin="dense" id="chassi" inputProps={inputChassi} label="Chassi" />
            <TextField margin="dense" id="placa" inputProps={inputPlaca} label="Placa" />
            <TextField margin="dense" id="cor" label="Cor" />
            <TextField margin="dense" type={'number'} id="km" label="KM" />
            <TextField 
              margin="dense" 
              type={'tel'} 
              inputProps={inputYear}
              id="year" 
              label="Ano Fabricação" 
            />
            <TextField 
              margin="dense" 
              type={'tel'} 
              inputProps={inputYear}
              id="year" 
              label="Ano Modelo" 
            />
            <TextField 
              margin="dense" 
              type={'number'}
              value={values.valor}
              onChange={handleChangeValue('valor')}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
              id="valor_venda" 
              label="Valor Venda" 
            />
            <TextField 
              select 
              value={revenda}
              onChange={handleChangeRevenda} 
              margin="dense" 
              id="revenda" 
              label="Revenda"
            >
              {revendas.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField 
              select 
              value={situacao}
              onChange={handleChangeSituacao} 
              margin="dense" 
              id="situacao" 
              label="Situação"
            >
              {situacoes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              SAIR
            </Button>
            <div className={classes.wrapper}>
              <Fab
                aria-label="save"
                color="primary"
                className={buttonClassname}
                onClick={handleButtonClickSave}
              >
                {success ? <CheckIcon /> : <SaveIcon />}
              </Fab>
              {loading && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
          </DialogActions>
        </Dialog>

        <Tooltip title="Atualizar Estoque">
          <IconButton aria-label="sync list">
            <Sync />
          </IconButton>
        </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('modelo');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = require('./database.json');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.modelo);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, modelo) => {
    const selectedIndex = selected.indexOf(modelo);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, modelo);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (modelo) => selected.indexOf(modelo) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            stickyHeader
            aria-label="sticky table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.chassi);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.chassi)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.chassi}
                      // selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.modelo}
                      </TableCell>
                      <TableCell align="left">{row.chassi}</TableCell>
                      <TableCell align="left">{row.placa}</TableCell>
                      <TableCell align="left">{row.cor}</TableCell>
                      <TableCell align="left">{row.km}</TableCell>
                      <TableCell align="left">{row.ano_fab}</TableCell>
                      <TableCell align="left">{row.ano_mod}</TableCell>
                      <TableCell align="left">R${row.valor_venda}</TableCell>
                      <TableCell align="left">{row.revenda}</TableCell>
                      <TableCell align="left">{row.situacao}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, rows.length]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage="Total por página"
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Comprimir linhas"
      />
    </div>
  );
}