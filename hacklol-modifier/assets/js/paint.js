/* Hacklol Modifier 1.4 */
$(document).ready(function() {
	if(window.HTMLCanvasElement) {
		// Variables :
		var color = "#000";
		var painting = false;
		var started = false;
		var width_brush = 5;
		var canvas = $("#canvas");
		var cursorX, cursorY;
		var restoreCanvasArray = [];
		var restoreCanvasIndex = 0;
		
		var context = canvas[0].getContext('2d');
		
		// Trait arrondi :
		context.lineJoin = 'round';
		context.lineCap = 'round';
		
		// Click souris enfoncé sur le canvas, je dessine :
		canvas.mousedown(function(e) {
			painting = true;
			
			// Coordonnées de la souris :
			cursorX = (e.pageX - this.offsetLeft);
			cursorY = (e.pageY - this.offsetTop);
		});
		
		// Relachement du Click sur tout le document, j'arrête de dessiner :
		$(this).mouseup(function() {
			painting = false;
			started = false;
		});
		
		// Doigt enfoncé sur le canvas, je dessine :
		canvas.bind('touchstart', function(e) {
			moveStart(e, true);
		});
		
		// Relachement du doigt sur tout le document, j'arrête de dessiner :
		$(this).bind('touchend', function() {
			moveEnd();
		});
		
		// Mouvement du doigt sur le canvas :
		canvas.bind('touchmove', function(e) {
			move(e, true, this);
		});
		
		// Mouvement de la souris sur le canvas :
		canvas.mousemove(function(e) {
			// Si je suis en train de dessiner (click souris enfoncé) :
			if (painting) {
				// Set Coordonnées de la souris :
				cursorX = (e.pageX - this.offsetLeft) - 10; // 10 = décalage du curseur
				cursorY = (e.pageY - this.offsetTop) - 10;
				
				// Dessine une ligne :
				drawLine();
			}
		});
		function move(e, mobile, obj) {
		// Si je suis en train de dessiner (click souris enfoncé) :
		if (painting) {
			if (mobile) {
				// Event mobile :
				var ev = e.originalEvent;
				e.preventDefault();
				
				// Set Coordonnées du doigt :
				// cursorX = (ev.pageX - obj.offsetLeft); // 10 = décalage du curseur
				// cursorY = (ev.pageY - obj.offsetTop);
				if(typeof(obj) != 'undefined') {
					cursorX = (ev.targetTouches[0].pageX - obj.offsetLeft); // 10 = décalage du curseur
					cursorY = (ev.targetTouches[0].pageY - obj.offsetTop);
				}
			}
			else {
				if(typeof(obj) != 'undefined') {
					// Set Coordonnées de la souris :
					cursorX = (e.pageX - obj.offsetLeft); // 10 = décalage du curseur
					cursorY = (e.pageY - obj.offsetTop);
				}
			}
			
			// Dessine une ligne :
			drawLine();
		}
	}

		// Fonction fin de mouvement :
		function moveEnd() {
			painting = false;
			started = false;
		}

		//  Fonction début de mouvement :
		function moveStart(e, mobile) {
			painting = true;
		
		// Coordonnées de la souris :
		if (mobile) {
			// Event mobile :
			var ev = e.originalEvent;
			e.preventDefault();
			
			// Set Coordonnées du doigt :
			if(typeof(obj) != 'undefined') {
				cursorX = (ev.pageX - obj.offsetLeft); // 10 = décalage du curseur
				cursorY = (ev.pageY - obj.offsetTop);
			}
		}
		else {
			if(typeof(obj) != 'undefined') {
				// Set Coordonnées de la souris :
				cursorX = (e.pageX - this.offsetLeft);
				cursorY = (e.pageY - this.offsetTop);
			}
		}
	}
		
		// Fonction qui dessine une ligne :
		function drawLine() {
			// Si c'est le début, j'initialise
			if (!started) {
				// Je place mon curseur pour la première fois :
				context.beginPath();
				context.moveTo(cursorX, cursorY);
				started = true;
			} 
			// Sinon je dessine
			else {
				context.lineTo(cursorX, cursorY);
				context.strokeStyle = color;
				context.lineWidth = width_brush;
				context.stroke();
			}
		}
		
		// Clear du Canvas :
		function clear_canvas() {
			context.clearRect(0,0, canvas.width(), canvas.height());
		}
		
		// Pour chaque carré de couleur :
		$("#couleurs a").each(function() {
			// Je lui attribut une couleur de fond :
			$(this).css("background", $(this).attr("data-couleur"));
			
			// Et au click :
			$(this).click(function() {
				// Je change la couleur du pinceau :
				color = $(this).attr("data-couleur");
				
				// Et les classes CSS :
				$("#couleurs a").removeAttr("class", "");
				$(this).attr("class", "actif");
				
				return false;
			});
		});
		
		$('#choixCouleur').colpick({
		layout:'hex',
		submit:0,
		color: 'ffffff',
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$("#choixCouleur").css("background-color", "#"+hex);
			color = "#"+hex;
		},
		onShow:function(hsb,hex,rgb,el,bySetColor) {
			color = $("#choixCouleur").css("background-color");
		}
		});
		
		// Largeur du pinceau :
		$("#largeurs_pinceau input").change(function() {
			if (!isNaN($(this).val())) {
				width_brush = $(this).val();
				$("#output").html($(this).val() + " pixels");
			}
		});
		
		// Bouton Reset :
		$("#resetPaint").click(function() {
			// Clear canvas :
			clear_canvas();
			
			// Valeurs par défaut :
			$("#largeur_pinceau").val(5).trigger('change');
			width_brush = 5;
			$("#output").html("5 pixels");
            color = "#000000";
            $('.actif').removeClass('actif');
            $("#color_paint_default").addClass("actif");
            $("#choixCouleur").css("background-color", "#ffffff");
		});
		
		// Bouton Save :
		$("#savePaint").click(function() {
			var canvas_tmp = document.getElementById("canvas");
			window.open(canvas_tmp.toDataURL("image/png"));
		});
		
		$( "#colorPaint" ).click(function() {
			$( "#bulleCouleur" ).stop().slideToggle("slow");
			$( "#bulleBrush" ).hide();
		});
		
		$( "#brushPaint" ).click(function() {
			$( "#bulleBrush" ).stop().slideToggle("slow");
			$( "#bulleCouleur" ).hide();
		});
	}
	else {
		$("#paint-not-compatible").show();
		$("#click-paint").hide();
		$("#paint-not-compatible").click(function() {
			alert(i18next.t('paint.not-compatible'));
		});
	}
});
