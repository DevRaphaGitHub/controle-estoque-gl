import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AccountBox from '@material-ui/icons/AccountBox';
import logo from './assets/grupo_lider.png';

function createData(modelo, chassi, placa, cor, km, ano_fab, ano_mod, valor_venda, revenda, situacao) {
  return { modelo, chassi, placa, cor, km, ano_fab, ano_mod, valor_venda, revenda, situacao };
}

const rows = [
  createData('CITY LX CVT',	'93HGM6650FZ105440',	'PPD4969',	'CINZA', 50000,	2014,	2015,	'51.900,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('COBALT 1.8L LTZ',	'9BGJC69Z0FB143794',	'PPB4004',	'BRANCO SUMMIT', 45000,	2014,	2015,	'39.900,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('ECOSPORT FSL 1.6',	'9BFZB55P7F8990990',	'PPD4936',	'PRATA', 87000,	2014,	2015,	'49.500,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('ETIOS HB PLT15 AT',	'9BRK29BT2J0125638',	'PPU0016',	'PRATA', 77000,	2017,	2018,	'53.900,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('FIESTA FLEX',	'9BFZF55A1E8081772',	'OYD6873',	'BRANCA',	64000,	2014,	2013,	'24.900,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('FIESTA HA 1.6L TI A',	'9BFZD55P7FB816656',	'PPF1270',	'BRANCA', 128718,	2015,	2015,	'41.500,00', 'BRACOM CACHOEIRO', 'ESTOQUE'),
  createData('GOL SPECIAL',	'9BWAA45U2GP503055',	'PPH8313',	'BRANCA', 38662,	2015,	2016,	'34.500,00', 'BRACOM CACHOEIRO', 'ESTOQUE'),
  createData('HB20 1.6A PREM',	'9BHBH51DBJP812694',	'QRC1474',	'BRANCA', 17000,	2017,	2018,	'61.900,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('HONDA HR-V EX CVT',	'93HRV2850GZ106439',	'PPG4I34',	'CINZA', 67000, 2015,	2016,	'69.800,00', 'BRACOM CACHOEIRO', 'TRÂNSITO'),
  createData('HYUNDAI HB20 1.6',	'9BHBH51DBGP529144',	'PPN4200',	'PRETA', 51000,	2015,	2016,	'48.000,00', 'BRACOM CACHOEIRO', 'ESTOQUE'),
  createData('CRUZE LT HB',	'9BGPB68M0EB165925',	'KPT9934',	'BRANCA',	0,	2013,	2014,	'49.000,00', 'BRACOM CACHOEIRO', 'TRÂNSITO'),
  createData('ECOSPORT FSL 1.6',	'9BFZE55P1C8746660',	'ODK1619',	'PRATA',	95000,	2012,	2012,	'33.637,00', 'BRACOM CACHOEIRO', 'TRÂNSITO'),
  createData('KA SE 1.0 HA  B',	'9BFZH55L7J8062181',	'LMM1196',	'BRANCA',	87000,	2018,	2017,	'38.000,00', 'BRACOM CACHOEIRO', 'TRÂNSITO'),
  createData('KA SE 1.0 HATCH',	'9BFZH55L3G8340731',	'PPN8526',	'PRATA',	35818,	2016,	2016,	'34.000,00', 'BRACOM CACHOEIRO', 'PROPOSTA'),
  createData('KA SE 1.0 HATCH',	'9BFZH55L4F8208057',	'PPF5F17',	'BRANCA',	70000,	2015,	2015,	'33.000,00', 'BRACOM CACHOEIRO', 'ESTOQUE'),
  createData('ONIX 1.0MT LS',	'9BGKR48G0GG289170',	'PPP6006',	'CINZA',	87000,	2016,	2016,	'35.000,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('ONIX 1.4 MT LT',	'9BGKS48V0JG168625',	'PPV0170',	'BRANCO SUMMIT',	80000,	2017,	2018,	'40.900,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('ONIX 1.4 MT LTZ',	'9BGKT48L0EG229749', 'OYD8535',	'PRETA',	45000,	2013,	2014,	'39.900,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('ONIX 1.4 MT LTZ',	'9BGKT48L0EG240527',	'OVL4972',	'PRATA',	92000,	2013,	2014,	'39.900,00', 'CVC CACHOEIRO', 'PROPOSTA'),
  createData('PALIO ATTRACT 1.4',	'8AP19627MG4145603',	'PPM0A25',	'BRANCA',	80000,	2015,	2016,	'34.000,00', 'BRACOM CACHOEIRO', 'ESTOQUE'),
  createData('PALIO FIRE FLEX',	'9BD17164G85214667',	'MSC2746',	'VERMELHA',	96000,	2008,	2008,	'16.000,00', 'BRACOM CACHOEIRO', 'ESTOQUE'),
  createData('PRISMA 1.4MT LT',	'9BGKS69V0JG355027',	'PPY1571',	'CINZA',	51255,	2018,	2018,	'48.500,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('PRISMA 1.4MT LT',	'9BGKS69L0EG301944',	'OYF0891',	'PRATA',	86700,	2014,	2014,	'41.900,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('RANGER CD LTD 4X4 3.2',	'8AFAR23L9GJ399354',	'PPG1667',	'PRETA',	148099,	2016,	2016,	'114.000,00', 'BRACOM CACHOEIRO', 'ESTOQUE'),
  createData('RANGER LTD CD 4A 32 C',	'8AFAR23L5JJ069511',	'PPX1410',	'BRANCA',	57000,	2018,	2018,	'143.580,00', 'BRACOM CACHOEIRO', 'TRÂNSITO'),
  createData('RANGER LTD CD4',	'8AFAR23L0HJ425521',	'PPK5E77',	'BRANCO',	130000,	2016,	2017,	'135.000,00', 'BRACOM CACHOEIRO', 'TRÂNSITO'),
  createData('SIENA ATTRACTIV 1.4',	'9BD19713MG3284788',	'PPC0170',	'BRANCA',	155000,	2015,	2016,	'26.000,00', 'CVC GUAÇUÍ', 'PROPOSTA'),
  createData('SIENA EL 1.4 FLEX',	'8AP372171E6065980',	'OVF7468',	'BRANCA',	47000,	2013,	2014,	'31.900,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('SILVERADO D20',	'9BG244DK01C708133',	'MTG3254',	'VERDE',	240000,	2001,	2001,	'44.000,00', 'CVC CACHOEIRO', 'ESTOQUE'),
  createData('SPIN 1.8L AT ACT',	'9BGJE75E0GB164372',	'KRM7848',	'BRANCA',	44000,	2016,	2016,	'47.000,00', 'CVC GUAÇUÍ', 'ESTOQUE'),
  createData('TRACKER 1.4 PREMIER TURBO ECOTEC',	'3GNCJ8EZ7JL206685',	'PPT2445',	'PRETA',	32000,	2017,	2018,	'78.500,00', 'CVC GUAÇUÍ', 'ESTOQUE'),
];

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
  { id: 'valor_venda', numeric: false, disablePadding: false, label: 'Valor Venda' },
  { id: 'revenda', numeric: false, disablePadding: false, label: 'Revenda' },
  { id: 'situacao', numeric: false, disablePadding: false, label: 'Situação' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all cars' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric = 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
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
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          <img src={logo} width="150px" />
        </Typography>

        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          ESTOQUE DE USADOS
        </Typography>

        <Tooltip title="Meu Perfil">
          <IconButton aria-label="filter list">
            <AccountBox />
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
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
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
                  const isItemSelected = isSelected(row.modelo);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.modelo)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.chassi}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.modelo}
                      </TableCell>
                      <TableCell align="left">{row.chassi}</TableCell>
                      <TableCell align="left">{row.placa}</TableCell>
                      <TableCell align="left">{row.cor}</TableCell>
                      <TableCell align="left">{row.km}</TableCell>
                      <TableCell align="left">{row.ano_fab}</TableCell>
                      <TableCell align="left">{row.ano_mod}</TableCell>
                      <TableCell align="left">{row.valor_venda}</TableCell>
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
          rowsPerPageOptions={[5, 10, 15]}
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
