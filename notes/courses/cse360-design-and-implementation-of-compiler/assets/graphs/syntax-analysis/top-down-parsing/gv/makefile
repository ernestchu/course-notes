# Usage: make T=[gv file without `.gv`]

GC = dot
OUTDIR = ../svg/
all: $(T).gv
	$(GC) $(T).gv -T svg -o $(OUTDIR)$(T).svg
