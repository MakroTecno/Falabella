/* 
PROYECTO CREADO POR MAKROTECNO S.A
DISEÑADO Y PROGRAMADO EN JAVASCRIPT
www.makrotecno.dx.am
DIOS BENDIGA ESTE PROYECTO!
*/
let fechaDeDesembolso, fechaDeFacturacion, dias, dia, mes, ano, d, fecha, tiempo, fechaexit;
let tnm, basecalculo, cuotasnumero, tna, tnd, tndAproximado, tsm, seguroDeudor, primerCuotaInicial, primerCuotaVencimiento;
let diaInicial, tasaPeriodoInicial, factorActualizacion, saldoInicial, interesInicial, interesActivo, interesActivoGeneral;
let fechainit, diasven, mesinit, anoinit, fechainicial, fechavencimiento, tasaPeriodoGeneral, diasGenerales, saldoGeneral;
let valorCuotaSinDeudores, capitalInicial;

	/* funcion inicial */
	$(document).ready(function(){
		$("#registro").click(function(){
			fechapago();
			valores();
			cuotas();
			valores2();
			diferencias();
			total();

		})
	})

	//Funcion que da la fecha actualizada.
	window.onload = function()
	{
		fecha = new Date();
		dia = fecha.getDate();
		mes = fecha.getMonth() + 1;
		ano = fecha.getFullYear();
		if(mes < 10){
			mes = '0' + mes;
		}
		if(dia < 10){
			dia = '0' + dia;
		}
		document.getElementById('fechadesembolso').value = + fecha.getFullYear() + '-' + mes + '-' + dia;
		document.getElementById('cuotainicio').value = + fecha.getFullYear() + '-' + mes + '-' + dia;
	}

		// 1° Cuota
	function fechapago()
	{
		fechaDeDesembolso = new Date(document.getElementById('fechadesembolso').value);
		fechaDeFacturacion =  new Date(document.getElementById('proxfact').value); 
		tiempo = fechaDeFacturacion.getTime() - fechaDeDesembolso.getTime();
		dias = Math.floor(tiempo/(1000*60*60*24));
		if(dias>15){
       	 if(mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
       	 	d = 16;
       	 	console.log(d);
       	 }else {
       	 	d = 15;
       	 	console.log(d);
       	 }
        }else if(mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
       		d = 46;
       		console.log(d);
        }else {
        	d = 45;
        	console.log(d);  	 	
        }
        var addTime = d*86400;
        fechaDeFacturacion.setSeconds(addTime);
        dia = fechaDeFacturacion.getDate();
		mes = fechaDeFacturacion.getMonth() + 1;
		ano = fechaDeFacturacion.getFullYear();
		if(mes < 10){
			mes = '0' + mes;
		}
		if(dia < 10){
			dia = '0' + dia;
		}
		document.getElementById('primercuota').value = + fechaDeFacturacion.getFullYear() + '-' + mes + '-' + (dia + 1);
		document.getElementById('cuotavencimiento').value = + fechaDeFacturacion.getFullYear() + '-' + mes + '-' + (dia + 1);
	}

	function valores()
	{
		tnm = document.getElementById('tasaNominalMensual').value;
		tasaNominal = (tnm*12)/100;
		núm_per_año = 12;
		tea = 1+(tasaNominal/núm_per_año);
		tea = Math.pow(tea, núm_per_año);
		tea = ((tea - 1)*100).toFixed(3);
		basecalculo = document.getElementById('tea').value = tea;
		basecalculo = document.getElementById('basecalculo').value;
		cuotasnumero = document.getElementById('cuotas').value;
		montoCredito = document.getElementById('montocredito').value;
		tna = (tnm*12).toFixed(2);
		document.getElementById('tna').value = tna;
		tndAproximado = (tna/basecalculo).toFixed(2);
		document.getElementById('tnd').value = tndAproximado;
		tnd = (tna/basecalculo);
		info = cuotasnumero + " | " + tnm/100;
		document.getElementById('info').value = info;
	}

	function valores2()
    {
    	document.getElementById('fechaultimacuota').value =+ ano + '-' + mes + '-' + dia;
    	document.getElementById('SaldoInicial').value = montoCredito;
    	tsm = document.getElementById('tsm').value;
    	seguroDeudor = (tsm*12)/365;
    	primerCuotaInicial = new Date(document.getElementById('cuotainicio').value);
    	primerCuotaVencimiento = new Date(document.getElementById('cuotavencimiento').value);
    	tiempo = primerCuotaVencimiento.getTime() - primerCuotaInicial.getTime();
    	diaInicial = Math.floor(tiempo/(1000*60*60*24));
    	document.getElementById('diainicial').value = diaInicial;
    	seguroDeudor = Math.round((((montoCredito*diaInicial)*tsm)*12)/365).toFixed(0);
    	seguroDeudor = seguroDeudor/100;
    	document.getElementById('seguroinicial').value = seguroDeudor;
    	tasaPeriodoInicial = diaInicial*tnd;
    	tasaPeriodoInicial = tasaPeriodoInicial/100;
    	//document.getElementById('tasaPeriodoInicial').value = tasaPeriodoInicial;
    	//document.getElementById('interesActivoInicial').value = tasaPeriodoInicial;
    	factorActualizacion = 1/(tasaPeriodoInicial + parseInt(1));
    	//document.getElementById('faInicial').value = factorActualizacion;
    	saldoInicial = document.getElementById('SaldoInicial').value;
    }



	function cuotas()
	{
		for(i = 1; i <= cuotasnumero; i++){
	        $('#resultado').append('<input type="number" value="'+ i +'">');
	    }

	      /* LISTA CUOTAS INICIO*/
	       for (var i = 1; i < cuotasnumero; i++) {
			mes = fechaDeFacturacion.getMonth() + i;
			dia = fechaDeFacturacion.getDate();
			console.log(dia);
			if (mes < 10) {
					mes = '0' + mes;
			}
			if(dia < 10){
			dia = '0' + dia;
			}
			if(mes > 12) {
					mes = parseInt(mes) - parseInt(12);
					ano = fechaDeFacturacion.getFullYear() + parseInt(1);
					if(mes > 12){
						mes = parseInt(mes) - parseInt(12);
						ano = fechaDeFacturacion.getFullYear() + parseInt(2);
						if(mes > 12){
							mes = parseInt(mes) - parseInt(12);
							ano = fechaDeFacturacion.getFullYear() + parseInt(3);
							if(mes > 12){
								mes = parseInt(mes) - parseInt(12);
								ano = fechaDeFacturacion.getFullYear() + parseInt(4);
								if(mes > 12){
									mes = parseInt(mes) - parseInt(12);
									ano = fechaDeFacturacion.getFullYear() + parseInt(5);
								}
							}
						}
					}
					if(mes < 10){
				       mes = '0' + mes;
			        }
			}
			if(mes == 0+'2' && dia > 28){
	      			dia -= parseInt(2);
	      	}
    		$('#listafechasinicio').append('<input type="date" value="'+ ano + '-' + mes + '-' + (dia + 1) +'" id="fechasinit">');
    	  }
	      /* LISTA CUOTAS VENCIMIENTO */
	    for (var i = 2; i <= cuotasnumero; i++) {
			mes = fechaDeFacturacion.getMonth() + i;
			dia = fechaDeFacturacion.getDate();
			ano = fechaDeFacturacion.getFullYear();
			if (mes < 10) {
					mes = '0' + mes;
			}
			if(dia < 10){
			dia = '0' + dia;
			}
			if(mes > 12) {
					mes = parseInt(mes) - parseInt(12);
					ano = fechaDeFacturacion.getFullYear() + parseInt(1);
					if(mes > 12){
						mes = parseInt(mes) - parseInt(12);
						ano = fechaDeFacturacion.getFullYear() + parseInt(2);
						if(mes > 12){
							mes = parseInt(mes) - parseInt(12);
							ano = fechaDeFacturacion.getFullYear() + parseInt(3);
							if(mes > 12){
								mes = parseInt(mes) - parseInt(12);
								ano = fechaDeFacturacion.getFullYear() + parseInt(4);
								if(mes > 12){
									mes = parseInt(mes) - parseInt(12);
									ano = fechaDeFacturacion.getFullYear() + parseInt(5);
								}
							}
						}
					}
					if(mes < 10){
				       mes = '0' + mes;
			        }
			}
			if(mes == 0+'2' && dia > 28){
	      			dia -= parseInt(2);
	      	}
    		$('#listafechasfin').append('<input type="date" value="'+ ano + '-' + mes + '-' + (dia + 1) +'" id="fechasexit">');
    		
    		fechaexit = new Date(document.getElementById('fechasexit').value);
    		tiempo = fechaexit.getTime() - parseInt(i);
    		dias = Math.floor(tiempo/(1000*60*60*24));
    	}
    }

    function diferencias()
	{
		  /* FOR PARA DETECTAR DIAS DE DIFERENCIA ENTRE FECHA INICIO Y VENCIMIENTO */
    	  for (var i = 1; i < cuotasnumero; i++) {
    	  	fechaexit = new Date(document.getElementById('fechasexit').value);
    	  	fechainit = new Date(document.getElementById('fechasinit').value);
    	  	/* MES VENCIMIENTO */
    	  	diasven = fechaexit.getDate() + parseInt(1);
    		mesven = fechaexit.getMonth() + i;
    		anoven = fechaexit.getFullYear();
    		/* MES INICIO */
    		diasinit = fechainit.getDate() + parseInt(1);
    		mesinit = fechainit.getMonth() + i;
    		anoinit = fechainit.getFullYear();
    		/* VALIDACION MES VENCIMIENTO */
    		if (mesven < 10) {
					mesven = '0' + mesven;
			}
			if(diasven < 10){
			diasven = '0' + diasven;
			}
			if(mesven > 12) {
					mesven = parseInt(mesven) - parseInt(12);
					anoven = fechaexit.getFullYear() + parseInt(1);
					if(mesven > 12){
						mesven = parseInt(mesven) - parseInt(12);
						anoven = fechaexit.getFullYear() + parseInt(2);
						if(mesven > 12){
							mesven = parseInt(mesven) - parseInt(12);
							anoven = fechaexit.getFullYear() + parseInt(3);
							if(mesven > 12){
								mesven = parseInt(mesven) - parseInt(12);
								anoven = fechaexit.getFullYear() + parseInt(4);
								if(mesven > 12){
									mesven = parseInt(mesven) - parseInt(12);
									anoven = fechaexit.getFullYear() + parseInt(5);
								}
							}
						}
					}
					if(mesven < 10){
				       mesven = '0' + mesven;
			        }
			}
			if(mesven == 0+'2' && diasven > 28){
	      			diasven -= parseInt(2);
	      	}
	      	/* VALIDACION MES INICIO */
	      	if (mesinit < 10) {
					mesinit = '0' + mesinit;
			}
			if(diasinit < 10){
				diasinit = '0' + diasinit;
			}
			if(mesinit > 12) {
					mesinit = parseInt(mesinit) - parseInt(12);
					anoinit = fechainit.getFullYear() + parseInt(1);
					if(mesinit > 12){
						mesinit = parseInt(mesinit) - parseInt(12);
						anoinit = fechainit.getFullYear() + parseInt(2);
						if(mesinit > 12){
							mesinit = parseInt(mesinit) - parseInt(12);
							anoinit = fechainit.getFullYear() + parseInt(3);
							if(mesinit > 12){
								mesinit = parseInt(mesinit) - parseInt(12);
								anoinit = fechainit.getFullYear() + parseInt(4);
								if(mesinit > 12){
									mesinit = parseInt(mesinit) - parseInt(12);
									anoinit = fechainit.getFullYear() + parseInt(5);
								}
							}
						}
					}
					if(mesinit < 10){
				       mesinit = '0' + mesinit;
			        }
			}
			if(mesinit == 0+'2' && diasinit > 28){
	      			diasinit -= parseInt(2);
	      	}
    	  	fechainicial = new Date(+anoinit + '-' + mesinit + '-' + diasinit);
    	  	fechavencimiento = new Date(+anoven + '-' + mesven + '-' + diasven);
    	  	tiempo = fechavencimiento.getTime() - fechainicial.getTime();
    	  	if(i==1){
    	  	interesInicial = (saldoInicial*tnd*diaInicial/100).toFixed(2);
    	  	document.getElementById('interesInicial').value = interesInicial;
    	  	interesActivo = tasaPeriodoInicial;
    	  	factorActualizacionGeneral = factorActualizacion;
    	  	//document.getElementById('interesActivoInicial').value = interesActivo;
    	  	}
    	  	diasGenerales = Math.floor(tiempo/(1000*60*60*24));
    	  	tasaPeriodoGeneral = (diasGenerales*tnd)/100;
    	  	$('#tasaPeriodoGeneral').append('<input type="number" value="'+tasaPeriodoGeneral+'" id="tasaPeriodoGeneral">');
    	  	interesActivo = (interesActivo+tasaPeriodoGeneral)+(interesActivo*tasaPeriodoGeneral);
    	  	$('#interesActivoGeneral').append('<input type="number" value="'+interesActivo+'" id="interesActivoGeneral">');
    	  	factorActualizacionGeneral = factorActualizacionGeneral+(1/(interesActivo+1));
    	  	$('#factorActualizacionGeneral').append('<input type="number" value="'+factorActualizacionGeneral+'" id="factorActualizacionGeneral">');
    	  	//console.log(factorActualizacionGeneral);
    	  	$('#dias').append('<input type="number" value="'+diasGenerales+'" id="diasgenerales">');
    	  	/* TASA PERIODICA */
    	  }
    	 valorCuotaSinDeudores = (saldoInicial/factorActualizacionGeneral).toFixed(2);
    	 document.getElementById('valorsindeudores').value = valorCuotaSinDeudores;
    	 document.getElementById('cuotaInicial').value = valorCuotaSinDeudores;
    	 for (var i = 1; i < cuotasnumero; i++) {
    	 	$('#cuota').append('<input type="number" value="'+valorCuotaSinDeudores+'" id="cuota">');
    	 }
	}


	function total()
	{
		for (var i = 1; i < cuotasnumero; i++) {
    	  	fechaexit = new Date(document.getElementById('fechasexit').value);
    	  	fechainit = new Date(document.getElementById('fechasinit').value);
    	  	/* MES VENCIMIENTO */
    	  	diasven = fechaexit.getDate() + parseInt(1);
    		mesven = fechaexit.getMonth() + i;
    		anoven = fechaexit.getFullYear();
    		/* MES INICIO */
    		diasinit = fechainit.getDate() + parseInt(1);
    		mesinit = fechainit.getMonth() + i;
    		anoinit = fechainit.getFullYear();
    		/* VALIDACION MES VENCIMIENTO */
    		if (mesven < 10) {
					mesven = '0' + mesven;
			}
			if(mesven > 12) {
					mesven = parseInt(mesven) - parseInt(12);
					anoven = fechaexit.getFullYear() + parseInt(1);
					if(mesven > 12){
						mesven = parseInt(mesven) - parseInt(12);
						anoven = fechaexit.getFullYear() + parseInt(2);
						if(mesven > 12){
							mesven = parseInt(mesven) - parseInt(12);
							anoven = fechaexit.getFullYear() + parseInt(3);
							if(mesven > 12){
								mesven = parseInt(mesven) - parseInt(12);
								anoven = fechaexit.getFullYear() + parseInt(4);
								if(mesven > 12){
									mesven = parseInt(mesven) - parseInt(12);
									anoven = fechaexit.getFullYear() + parseInt(5);
								}
							}
						}
					}
					if(mesven < 10){
				       mesven = '0' + mesven;
			        }
			}
			if(mesven == 0+'2' && diasven > 28){
	      			diasven -= parseInt(2);
	      	}
	      	/* VALIDACION MES INICIO */
	      	if (mesinit < 10) {
					mesinit = '0' + mesinit;
			}
			if(mesinit > 12) {
					mesinit = parseInt(mesinit) - parseInt(12);
					anoinit = fechainit.getFullYear() + parseInt(1);
					if(mesinit > 12){
						mesinit = parseInt(mesinit) - parseInt(12);
						anoinit = fechainit.getFullYear() + parseInt(2);
						if(mesinit > 12){
							mesinit = parseInt(mesinit) - parseInt(12);
							anoinit = fechainit.getFullYear() + parseInt(3);
							if(mesinit > 12){
								mesinit = parseInt(mesinit) - parseInt(12);
								anoinit = fechainit.getFullYear() + parseInt(4);
								if(mesinit > 12){
									mesinit = parseInt(mesinit) - parseInt(12);
									anoinit = fechainit.getFullYear() + parseInt(5);
								}
							}
						}
					}
					if(mesinit < 10){
				       mesinit = '0' + mesinit;
			        }
			}
			if(mesinit == 0+'2' && diasinit > 28){
	      			diasinit -= parseInt(2);
	      	}
    	  	fechainicial = new Date(+anoinit + '-' + mesinit + '-' + diasinit);
    	  	fechavencimiento = new Date(+anoven + '-' + mesven + '-' + diasven);
    	  	tiempo = fechavencimiento.getTime() - fechainicial.getTime();
    	  	diasGenerales = Math.floor(tiempo/(1000*60*60*24));
    	  	///////////////////////////////////////////////////////////////////////
    	 	if(i==1){
    	 	interesInicial = document.getElementById('interesInicial').value;
    	 	capitalInicial = (valorCuotaSinDeudores - interesInicial).toFixed(2);
    	 	document.getElementById('capitalInicial').value = capitalInicial;
    	 	SaldoInicial = (saldoInicial - capitalInicial).toFixed(2);
    	 	document.getElementById('saldoInicial2').value = SaldoInicial;
    	 	totalCuotaInicial = (parseFloat(valorCuotaSinDeudores) + parseFloat(seguroDeudor)).toFixed(2);
    	 	document.getElementById('totalCuotaInicial').value = totalCuotaInicial;
    	 	document.getElementById('cuotaInformar').value = totalCuotaInicial;
    	 	}
    	 	///////////////////////////////////////////////////////////////////////
	      	interesGeneral = ((SaldoInicial*tnd*diasGenerales)/100).toFixed(2);
    	  	$('#intereses').append('<input type="number" value="'+interesGeneral+'" id="interesGeneral">');
    	  	seguroDeudor = Math.round((((SaldoInicial*diasGenerales)*tsm)*12)/365).toFixed(0);
    		seguroDeudor = seguroDeudor/100;
    		$('#sd').append('<input type="number" value="'+seguroDeudor+'" id="interesGeneral">');
    		totalCuota = (parseFloat(valorCuotaSinDeudores) + parseFloat(seguroDeudor)).toFixed(2);
    		$('#totalcuota').append('<input type="number" value="'+totalCuota+'" id="totalCuota">');
    	  	capitalGeneral = (valorCuotaSinDeudores - interesGeneral).toFixed(2);
    	  	$('#capital').append('<input type="number" value="'+capitalGeneral+'" id="capitalGeneral">');
    	  	SaldoInicial = (parseFloat(SaldoInicial) - parseFloat(capitalGeneral)).toFixed(2);
    	  	$('#saldo').append('<input type="number" value="'+SaldoInicial+'" id="saldoGeneral">');
    	}
	}

