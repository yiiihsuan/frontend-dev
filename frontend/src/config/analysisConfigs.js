export const analysisConfigs = {
    deseq2: {
        items: [
            'sample_col',
            'control_col',
            'control_val',
            'vehicle_control_val',
            'gene_col',
            'time_col',
        ],
        defaultValues: {
            sample_col: 'sample',
            control_col: 'drug',
            control_val: 'untreated',
            vehicle_control_val: 'dmso',
            gene_col: 'gene_id',
            time_col: 'hours',
        },
    },


    deseq2GSEA: {
        items: [
            'organism',
            'gene_sets_db',
        ],
        defaultValues: {
            organism: 'human',
            gene_sets_db: 'MSigDB_Hallmark_2020,KEGG_2021_Human',
        },

    },

    GeneralGSEA: {
        items: [
            'sample_col',
            'control_col',
            'target_col',
            'set_target_th',
            'gsea_plot_n',
            'enrichment_cutoff',
            'dotplot_cutoff',
            'barplot_cutoff'

        ],
        defaultValues: {
            sample_col: 'sample',
            control_col: 'drug',
            target_col: 'beat_per_min',
            set_target_th: '40',
            gsea_plot_n: '10',
            enrichment_cutoff: '0.7',
            dotplot_cutoff: '1',
            barplot_cutoff: '0.7',
        },
    },

    baselineSelection: {
        items: [
            'response_col',
        ],
        defaultValues: {
            response_col: 'beat_per_min',
        },
    },

    geneCollection: {
        items: [
            'literature_gene_flag',
            'reactome_gene_flag',
            'shap_gene_flag',
            'wgcna_gene_flag',
        ],
        defaultValues: {
            literature_gene_flag: 'true',
            reactome_gene_flag: 'true',
            shap_gene_flag: 'true',
            wgcna_gene_flag: 'false',
        },
    },

    geneSelection: {
        items: [
            'target_col',
        ],
        defaultValues: {
            target_col: 'beat_per_min',
        },
    },

    baseModel: {
        items: [
            'target_col',
            'min_score_th',
            'mode',
        ],
        defaultValues: {
            target_col: 'beat_per_min',
            min_score_th: '0.2',
            mode: 'regression',
        },
    },

    MLPModel: {
        items: [
            'target_col',
            'min_score_th',
            'num_epochs',
            'mode',
        ],
        defaultValues: {
            target_col: 'beat_per_min',
            min_score_th: '0.2',
            num_epochs: '100',
            mode: 'regression',
        },
    },




    // deseq2Reactome: {
    //     items: [
    //       'sample_col',
    //       'control_col',
    //       'control_val',
    //       'vehicle_control_val',
    //       'gene_col',
    //       'time_col',
    //     ],
    //     defaultValues: {
    //       sample_col: 'sample',
    //       control_col: 'drug',
    //       control_val: 'untreated',
    //       vehicle_control_val: 'dmso',
    //       gene_col: 'gene_id',
    //       time_col: 'hours',
    //     },
    //   },

    GeneralGSEA: {
        items: [
            'sample_col',
            'control_col',
            'target_col',
            'set_target_th',
            'gsea_plot_n',
            'enrichment_cutoff',
            'dotplot_cutoff',
            'barplot_cutoff',
        ],
        defaultValues: {
            sample_col: 'sample',
            control_col: 'drug',
            target_col: 'beat_per_min',
            set_target_th: '40',
            gsea_plot_n: '10',
            enrichment_cutoff: '0.7',
            dotplot_cutoff: '1',
            barplot_cutoff: '0.7',

        },
    },

    WGCNA: {
        items: [
            'sample_col',
            'control_col',
            'target_col',
            'set_target_th',
            'gsea_plot_n',
            'enrichment_cutoff',
            'dotplot_cutoff',
            'barplot_cutoff',
        ],
        defaultValues: {
            sample_col: 'sample',
            control_col: 'drug',
            target_col: 'beat_per_min',
            set_target_th: '40',
            gsea_plot_n: '10',
            enrichment_cutoff: '0.7',
            dotplot_cutoff: '1',
            barplot_cutoff: '0.7',

        },
    },
};
